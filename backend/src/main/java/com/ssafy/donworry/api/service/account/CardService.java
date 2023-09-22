package com.ssafy.donworry.api.service.account;

import com.ssafy.donworry.api.controller.account.dto.response.CardInfoResponse;
import com.ssafy.donworry.api.controller.account.dto.response.ConsumptionResponse;
import com.ssafy.donworry.api.controller.account.dto.response.ConsumtionDetailResponse;
import com.ssafy.donworry.api.controller.account.dto.response.eachCardConsumptionTotalPrice;
import com.ssafy.donworry.domain.account.repository.CardRepository;
import com.ssafy.donworry.domain.account.repository.query.CardQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CardService {
    private final CardQueryRepository cardQueryRepository;
    private final CardRepository cardRepository;
    public List<CardInfoResponse> findCardInfoList(Long memberId) {
        List<CardInfoResponse> cards = cardQueryRepository.findCardInfoByMemberId(memberId);
        return cards;
    }

    public ConsumptionResponse findEachCardConsumption(Long memberId, Long month) {
        List<eachCardConsumptionTotalPrice> list = cardQueryRepository.findALlEachCardTotalPrice(memberId, month);
        Long totalRemained = 0L;

        for(int i = 0; i < list.size(); i++){
            totalRemained += list.get(i).consumptionTotalPrice();
        }
        return ConsumptionResponse.of(totalRemained, list);
    }

    public List<ConsumtionDetailResponse> findEachCardOfMonthDetailConsumption(Long cardId, Long month) {
        List<ConsumtionDetailResponse> list = cardQueryRepository.findEachCardOfMonthDetailConsumption(cardId, month);
        return list;
    }
}
