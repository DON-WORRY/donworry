package com.ssafy.donworry.api.service.finance.query;

import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayPersonResponse;
import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayTotalListResponse;
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

    public DutchpayTotalListResponse searchDutchpay(Long memberId) {
        // 내가 보내야 할 더치페이 리스트
        List<DutchpayTotalResponse> sendDutchpayTotalList = new ArrayList<>();
        
        // 보내야 할 더치페이 가져오기
        // 나의 멤버 아이디가 들어있는 세부더치페이의 더치페이 아이디 리스트 가져오기
        List<Dutchpay> sendDutchpayList = detailDutchpayQueryRepository.searchSendDutchpayList(memberId);
        for(int i = 0; i < sendDutchpayList.size(); i++) {
            System.out.println(sendDutchpayList.get(i).getConsumption().getId());
        }
        // 리스트롤 통해 한 더치페이 현황 가져오기

        // 한 더치페이의 필요 값과 세부더치페이 리스트 가져오기
        // 세부더치페이의 정보 리스트 가져오기


        // 내가 받아야 할 더치페이 리스트 가져오기
        List<DutchpayTotalResponse> receiveDutchpayList = new ArrayList<>();

        return null;
    }
}
