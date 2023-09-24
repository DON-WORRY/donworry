package com.ssafy.donworry.api.service.finance.query;

import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayPersonResponse;
import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayTotalListResponse;
import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayTotalResponse;
import com.ssafy.donworry.domain.finance.entity.Consumption;
import com.ssafy.donworry.domain.finance.entity.DetailDutchpay;
import com.ssafy.donworry.domain.finance.entity.Dutchpay;
import com.ssafy.donworry.domain.finance.repository.DetailDutchpayRepository;
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
    private final DutchpayRepository dutchpayRepository;
    private final DutchpayQueryRepository dutchpayQueryRepository;
    private final DetailDutchpayRepository detailDutchpayRepository;
    private final DetailDutchpayQueryRepository detailDutchpayQueryRepository;

    public DutchpayTotalListResponse searchDutchpay(Long memberId) {
        // 내가 보내야 할 더치페이 리스트
        List<DutchpayTotalResponse> sendDutchpayTotalList = new ArrayList<>();
        
        // 보내야 할 더치페이 가져오기
        // 나의 멤버 아이디가 들어있는 세부더치페이의 더치페이 아이디 리스트 가져오기
        List<Dutchpay> sendDutchpayList = detailDutchpayQueryRepository.searchSendDutchpayList(memberId);
        // 리스트롤 통해 한 더치페이 현황 가져오기
        for(int i = 0; i < sendDutchpayList.size(); i++) {
            log.info("보내야할 더치페이 ID : {}", sendDutchpayList.get(i).getId());
            List<DetailDutchpay> detailDutchpayList = detailDutchpayQueryRepository.searchDetailDutchpayList(sendDutchpayList.get(i).getId());

            List<DutchpayPersonResponse> dutchpayPersonList = new ArrayList<>();
            for(int j = 0; j < detailDutchpayList.size(); j++) {
                dutchpayPersonList.add(DutchpayPersonResponse.of(detailDutchpayList.get(j)));
                log.info("보내는 세부더치페이{}", dutchpayPersonList.get(j));
            }

            sendDutchpayTotalList.add(DutchpayTotalResponse.of(sendDutchpayList.get(i).getConsumption(), dutchpayPersonList));
        }

        List<DutchpayTotalResponse> receiveDutchpayTotalList = new ArrayList<>();

        // 보내야 할 더치페이 가져오기
        // 나의 멤버 아이디가 들어있는 세부더치페이의 더치페이 아이디 리스트 가져오기
        List<Dutchpay> receiveDutchpayList = dutchpayRepository.findAllByMemberId(memberId);
        // 리스트롤 통해 한 더치페이 현황 가져오기
        for(int i = 0; i < receiveDutchpayList.size(); i++) {
            log.info("받아야할 더치페이 ID : {}", receiveDutchpayList.get(i).getId());
            List<DetailDutchpay> detailDutchpayList = detailDutchpayQueryRepository.searchDetailDutchpayList(receiveDutchpayList.get(i).getId());

            List<DutchpayPersonResponse> dutchpayPersonList = new ArrayList<>();
            for(int j = 0; j < detailDutchpayList.size(); j++) {
                dutchpayPersonList.add(DutchpayPersonResponse.of(detailDutchpayList.get(j)));
                log.info("보내는 세부더치페이{}", dutchpayPersonList.get(j));
            }
            receiveDutchpayTotalList.add(DutchpayTotalResponse.of(receiveDutchpayList.get(i).getConsumption(), dutchpayPersonList));
        }

        DutchpayTotalListResponse dutchpayTotalListResponse = DutchpayTotalListResponse.of(sendDutchpayTotalList, receiveDutchpayTotalList);

        return dutchpayTotalListResponse;
    }
}
