package com.ssafy.donworry.api.service.finance;

import com.ssafy.donworry.api.controller.finance.dto.request.DutchpayCreateRequest;
import com.ssafy.donworry.api.controller.finance.dto.request.ReqAmountRequest;
import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayPersonResponse;
import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayTotalResponse;
import com.ssafy.donworry.api.service.finance.query.DutchpayQueryService;
import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.DuplicateReqException;
import com.ssafy.donworry.common.error.exception.EntityNotFoundException;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.domain.finance.entity.Consumption;
import com.ssafy.donworry.domain.finance.entity.DetailDutchpay;
import com.ssafy.donworry.domain.finance.entity.Dutchpay;
import com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus;
import com.ssafy.donworry.domain.finance.repository.ConsumptionRepository;
import com.ssafy.donworry.domain.finance.repository.DetailDutchpayRepository;
import com.ssafy.donworry.domain.finance.repository.DutchpayRepository;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
import com.sun.jdi.request.DuplicateRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

}
