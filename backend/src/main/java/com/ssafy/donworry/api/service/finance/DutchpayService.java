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
import com.ssafy.donworry.domain.finance.repository.query.DetailDutchpayQueryRepository;
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

import static com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus.COMPLETE;
import static com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus.PROGRESS;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DutchpayService {
    private final ConsumptionRepository consumptionRepository;
    private final MemberRepository memberRepository;
    private final DutchpayRepository dutchpayRepository;
    private final DetailDutchpayRepository detailDutchpayRepository;
    private final DetailDutchpayQueryRepository detailDutchpayQueryRepository;
    private final BCryptPasswordEncoder encoder;
    private final AccountRepository accountRepository;
    private final IncomeRepository incomeRepository;

    public Long createDutchpay(DutchpayCreateRequest dutchpayCreateRequest,
                                                Long memberId) {
        Consumption consumption = consumptionRepository.findById(dutchpayCreateRequest.consumptionId())
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.CONSUMPTION_NOT_FOUND)
                );
        if(consumption.getDutchpayStatus().equals(PROGRESS)
        || consumption.getDutchpayStatus().equals(COMPLETE)) {
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

        consumption.updateDutchpayStatus(PROGRESS);
        consumptionRepository.save(consumption);
        log.info("update consumption dutchpayStatus : {}", consumption.getId());

        for (ReqAmountRequest req : dutchpayCreateRequest.reqAmountList()) {
            Member reqMember = memberRepository.findByMemberEmail(req.memberEmail())
                    .orElseThrow(
                            () -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_FOUND)
                    );
            try {
                DetailDutchpay detailDutchpay = DetailDutchpay.of(req, reqMember, dutchpay);
                detailDutchpayRepository.save(detailDutchpay);
            }
            catch (Exception e) {
                throw new InvalidValueException(ErrorCode.DETAIL_DUTCHPAY_SAVE_ERROR);
            }
        }

        return dutchpay.getId();
    }

    public Long dutchpayTransfer(Long memberId, DutchpayTransferRequest dutchpayTransferRequest) {
        DetailDutchpay detailDutchpay = detailDutchpayRepository.findById(dutchpayTransferRequest.detailDutchpayId())
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.DETAIL_DUTCHPAY_NOT_FOUND)
                );
        log.info("상세 더치페이id : {}", detailDutchpay.getId());
        // 간편 비밀번호 확인
        Member member = detailDutchpay.getMember();
        if(!member.getId().equals(memberId)) {
            throw new InvalidValueException(ErrorCode.DETAIL_DUTCHPAY_MEMBER_NOT_MATCH);
        }
        if(!encoder.matches(dutchpayTransferRequest.simplePassword(), detailDutchpay.getMember().getMemberSimplePassword())) {
            throw new InvalidValueException(ErrorCode.SIMPLE_PASSWORD_NOT_MATCH);
        }

        /***/

        Account senderAccount = accountRepository.findFirstByMemberId(memberId);
        Account receiverAccount = detailDutchpay.getDutchpay().getConsumption().getAccount();

        Long price = dutchpayTransferRequest.sendPrice();

        if(senderAccount.getAccountAmount() < price) {
            throw new InvalidValueException(ErrorCode.ACCOUNT_NO_MONEY);
        }


        Long reqPrice = detailDutchpay.getDutchpayReqPrice();
        Long receivePrice = detailDutchpay.getDutchpayReceivedPrice();

        DutchpayStatus dutchpayStatus = (reqPrice <= receivePrice + price) ? COMPLETE : PROGRESS;
        detailDutchpay.updateDetailDutchpay(price, dutchpayStatus);
        senderAccount.updateSendAmount(price);
        receiverAccount.updateReceiveAmount(price);

        /***/

        detailDutchpayRepository.save(detailDutchpay);
        log.info("save detailDutchpay : {}", detailDutchpay.getId());

        List<DetailDutchpay> detailDutchpayList = detailDutchpayRepository.findByDutchpayId(detailDutchpay.getDutchpay().getId());
        boolean flag = true;
        for(DetailDutchpay dd : detailDutchpayList) {
            if(dd.getDutchpayStatus().equals(PROGRESS)) {
                flag = false;
            }
        }
        if(flag) {
            Consumption c = detailDutchpay.getDutchpay().getConsumption();
            c.updateDutchpayStatus(COMPLETE);
            Dutchpay d = detailDutchpay.getDutchpay();
            d.updateDutchpayStatus(COMPLETE);

            consumptionRepository.save(c);
            dutchpayRepository.save(d);
            // 모든 세부더치페이가 완료되었으면 더치페이 및 소비에 더치페이 상태 완료 변경
        }
        accountRepository.save(senderAccount);
        log.info("save senderAccount : {}", senderAccount.getId());
        accountRepository.save(receiverAccount);
        log.info("save receiverAccount : {}", receiverAccount.getId());




        Income income = Income.of(
                detailDutchpay.getDutchpay().getConsumption().getConsumptionDetail() + "(정산)",
                price,
                receiverAccount.getAccountAmount(),
                detailDutchpay.getMember(),
                receiverAccount,
                senderAccount,
                detailDutchpay
        );
        Consumption consumption = Consumption.of(
                detailDutchpay.getDutchpay().getConsumption().getConsumptionDetail() + "(정산)",
                price,
                senderAccount.getAccountAmount(),
                dutchpayStatus,
                memberRepository.findById(memberId).get(),
                senderAccount,
                receiverAccount,
                detailDutchpay.getDutchpay().getConsumption().getConsumptionCategory()
        );

        incomeRepository.save(income);
        log.info("save income : {}", income.getId());
        consumptionRepository.save(consumption);
        log.info("save consumption : {}", consumption.getId());

        return detailDutchpay.getId();
    }
}
