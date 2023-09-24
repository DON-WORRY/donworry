package com.ssafy.donworry.api.service.finance;

import com.ssafy.donworry.api.controller.finance.dto.request.DutchpayCreateRequest;
import com.ssafy.donworry.api.controller.finance.dto.request.DutchpayTransferRequest;
import com.ssafy.donworry.api.controller.finance.dto.request.ReqAmountRequest;
import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayPersonResponse;
import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayTotalResponse;
import com.ssafy.donworry.api.service.finance.query.DutchpayQueryService;
import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.DuplicateReqException;
import com.ssafy.donworry.common.error.exception.EntityNotFoundException;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.account.repository.AccountRepository;
import com.ssafy.donworry.domain.finance.entity.Consumption;
import com.ssafy.donworry.domain.finance.entity.DetailDutchpay;
import com.ssafy.donworry.domain.finance.entity.Dutchpay;
import com.ssafy.donworry.domain.finance.entity.Income;
import com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus;
import com.ssafy.donworry.domain.finance.repository.ConsumptionRepository;
import com.ssafy.donworry.domain.finance.repository.DetailDutchpayRepository;
import com.ssafy.donworry.domain.finance.repository.DutchpayRepository;
import com.ssafy.donworry.domain.finance.repository.IncomeRepository;
import com.ssafy.donworry.domain.finance.repository.query.IncomeQueryRepository;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
import com.sun.jdi.request.DuplicateRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DutchpayService {
    private final ConsumptionRepository consumptionRepository;
    private final MemberRepository memberRepository;
    private final DutchpayRepository dutchpayRepository;
    private final DetailDutchpayRepository detailDutchpayRepository;
    private final BCryptPasswordEncoder encoder;
    private final AccountRepository accountRepository;
    private final IncomeRepository incomeRepository;

    public DutchpayTotalResponse createDutchpay(DutchpayCreateRequest dutchpayCreateRequest,
                                                Long memberId) {
        List<DutchpayPersonResponse> dutchpayPersonList = new ArrayList<>();
        Consumption consumption = consumptionRepository.findById(dutchpayCreateRequest.consumptionId())
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.CONSUMPTION_NOT_FOUND)
                );
        if(consumption.getDutchpayStatus().equals(DutchpayStatus.PROGRESS)
        || consumption.getDutchpayStatus().equals(DutchpayStatus.COMPLETE)) {
            throw new DuplicateReqException(ErrorCode.DUTCHPAY_DUPLICATE);
        }
        Member member = memberRepository.findById(memberId)
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_FOUND)
                );
        Dutchpay dutchpay;
        try{
            dutchpay = Dutchpay.of(consumption, member);
            dutchpayRepository.save(dutchpay);
            log.info("saveDutchpay : {}", dutchpay.getId());
        }
        catch (Exception e) {
            throw new InvalidValueException(ErrorCode.DUTCHPAY_SAVE_ERROR);
        }

        consumption.updateDutchpayStatus(DutchpayStatus.PROGRESS);
        consumptionRepository.save(consumption);
        log.info("update consumption dutchpayStatus : {}", consumption.getId());

        for (ReqAmountRequest req : dutchpayCreateRequest.reqAmountList()) {
            Member reqMember = memberRepository.findById(req.memberId())
                    .orElseThrow(
                            () -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_FOUND)
                    );
            try {
                DetailDutchpay detailDutchpay = DetailDutchpay.of(req, reqMember, dutchpay);
                detailDutchpayRepository.save(detailDutchpay);
                dutchpayPersonList.add(DutchpayPersonResponse.of(detailDutchpay));
            }
            catch (Exception e) {
                throw new InvalidValueException(ErrorCode.DETAIL_DUTCHPAY_SAVE_ERROR);
            }
        }
        DutchpayTotalResponse dutchpayTotalResponse = DutchpayTotalResponse.of(consumption, dutchpayPersonList);

        return dutchpayTotalResponse;
    }

    public Long dutchpayTransfer(Long memberId, DutchpayTransferRequest dutchpayTransferRequest) {
        DetailDutchpay detailDutchpay = detailDutchpayRepository.findById(dutchpayTransferRequest.detailDutchpayId())
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.DETAIL_DUTCHPAY_NOT_FOUND)
                );

        // 간편 비밀번호 확인
        if(!encoder.matches(dutchpayTransferRequest.simplePassword(), detailDutchpay.getMember().getMemberSimplePassword())) {
            throw new InvalidValueException(ErrorCode.SIMPLE_PASSWORD_NOT_MATCH);
        }
        log.info("상세 더치페이id : {}", detailDutchpay.getId());
        Account senderAccount = accountRepository.findFirstByMemberId(memberId);
        Account account = accountRepository.findFirstByMemberId(detailDutchpay.getMember().getId());
        Income income = Income.of(
                detailDutchpay.getDutchpay().getConsumption().getConsumptionDetail() + " 정산",
                dutchpayTransferRequest.sendPrice(),
                account.getAccountAmount(),
                detailDutchpay.getMember(),
                account,
                senderAccount,
                detailDutchpay
        );
        log.info("save income : {}", income);

        Long reqPrice = detailDutchpay.getDutchpayReqPrice();
        Long receivePrice = detailDutchpay.getDutchpayReceivedPrice() + dutchpayTransferRequest.sendPrice();
        DutchpayStatus dutchpayStatus = (reqPrice <= receivePrice) ? DutchpayStatus.COMPLETE : DutchpayStatus.PROGRESS;
        Consumption consumption = Consumption.of(
                detailDutchpay.getDutchpay().getConsumption().getConsumptionDetail() + " 정산",
                dutchpayTransferRequest.sendPrice(),
                senderAccount.getAccountAmount(),
                dutchpayStatus,
                memberRepository.findById(memberId).get(),
                senderAccount,
                account,
                detailDutchpay.getDutchpay().getConsumption().getConsumptionCategory()
        );
        log.info("save consumption : {}", consumption);

        // TODO: 2023-09-24 (024) 에러 검증 추가하기

        return detailDutchpay.getId();
    }
}
