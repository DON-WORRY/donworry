package com.ssafy.donworry.api.service.finance;

import com.ssafy.donworry.api.controller.finance.dto.request.DutchpayCreateRequest;
import com.ssafy.donworry.api.controller.finance.dto.request.ReqAmountRequest;
import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayPersonResponse;
import com.ssafy.donworry.api.service.finance.query.DutchpayQueryService;
import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.EntityNotFoundException;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.domain.finance.entity.Consumption;
import com.ssafy.donworry.domain.finance.entity.DetailDutchpay;
import com.ssafy.donworry.domain.finance.entity.Dutchpay;
import com.ssafy.donworry.domain.finance.repository.ConsumptionRepository;
import com.ssafy.donworry.domain.finance.repository.DutchpayRepository;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
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
    private final DutchpayQueryService dutchpayQueryService;

    public List<DutchpayPersonResponse> createDutchpay(DutchpayCreateRequest dutchpayCreateRequest) {
        List<DutchpayPersonResponse> dutchpayPersonList = new ArrayList<>();
        Consumption consumption = consumptionRepository.findById(dutchpayCreateRequest.consumptionId())
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.CONSUMPTION_NOT_FOUND)
                );
        for (ReqAmountRequest req : dutchpayCreateRequest.reqAmountList()) {
            Member member = memberRepository.findById(req.memberId())
                    .orElseThrow(
                            () -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_FOUND)
                    );
//            try {
//                DetailDutchpay detailDutchpay = DetailDutchpay.of(req, member, consumption);
//                dutchpayRepository.save(dutchpay);
//                dutchpayPersonList.add(DutchpayPersonResponse.of(dutchpay));
//            }
//            catch (Exception e) {
//                throw new InvalidValueException(ErrorCode.Dutchpay_SAVE_ERROR);
//            }
        }

        return dutchpayPersonList;
    }

}
