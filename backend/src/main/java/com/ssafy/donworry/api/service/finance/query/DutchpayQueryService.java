package com.ssafy.donworry.api.service.finance.query;

import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayPersonResponse;
import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayTotalResponse;
import com.ssafy.donworry.domain.finance.entity.Dutchpay;
import com.ssafy.donworry.domain.finance.repository.DutchpayRepository;
import com.ssafy.donworry.domain.finance.repository.query.DetailDutchpayQueryRepository;
import com.ssafy.donworry.domain.finance.repository.query.DutchpayQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DutchpayQueryService {
    private final DutchpayQueryRepository dutchpayQueryRepository;
    private final DetailDutchpayQueryRepository detailDutchpayQueryRepository;

    public List<DutchpayTotalResponse> searchDutchpay(Long memberId) {
        // 더치페이 현황
        // 1. 요청 받은 더치페이들 중 progress 만
        List<DutchpayPersonResponse> dutchpayPersonList = detailDutchpayQueryRepository.searchDutchpayPersonList(memberId);

        // 2. 내가 요청한 더치페이들 중 progress 만

//        List<Long> dutchpayConsumptionList = dutchpayQueryRepository.searchConsumptionList(memberId);
//        for(Long l : dutchpayConsumptionList) {
//            log.info("id : {}", l);
//        }
//        List<DutchpayPersonResponse> dutchpayPersonList = new ArrayList<>();

//        List<Dutchpay> dutchpayList = dutchpayRepository.findAllByMemberId(memberId);
//        for(Dutchpay dutchpay : dutchpayList) {
//            DutchpayPersonResponse dutchpayPersonResponse = DutchpayPersonResponse.of(dutchpay);
//            dutchpayPersonList.add(dutchpayPersonResponse);
//        }
        return null;
    }
}
