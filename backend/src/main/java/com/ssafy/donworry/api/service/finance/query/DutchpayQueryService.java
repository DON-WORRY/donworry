package com.ssafy.donworry.api.service.finance.query;

import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayPersonResponse;
import com.ssafy.donworry.domain.finance.entity.Dutchpay;
import com.ssafy.donworry.domain.finance.repository.DutchpayRepository;
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
    private final DutchpayRepository dutchpayRepository;
    private final DutchpayQueryRepository dutchpayQueryRepository;

    public List<List<DutchpayPersonResponse>> searchDutchpay(Long memberId) {
        // 더치페이 한 소비내역 불러오기 -> 멤버아이디에서 더치페이를 다 가져온 후 중복을 제거한 소비 아이디 리스트 얻기
//        List<Long> dutchpayConsumptionList = dutchpayQueryRepository.searchConsumptionList(memberId);
//        for(Long l : dutchpayConsumptionList) {
//            log.info("id : {}", l);
//        }


        List<DutchpayPersonResponse> dutchpayPersonList = new ArrayList<>();

//        List<Dutchpay> dutchpayList = dutchpayRepository.findAllByMemberId(memberId);
//        for(Dutchpay dutchpay : dutchpayList) {
//            DutchpayPersonResponse dutchpayPersonResponse = DutchpayPersonResponse.of(dutchpay);
//            dutchpayPersonList.add(dutchpayPersonResponse);
//        }
        return null;
    }
}
