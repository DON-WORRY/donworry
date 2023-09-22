package com.ssafy.donworry.api.service.account;

import com.ssafy.donworry.api.controller.account.CardInfoResponse;
import com.ssafy.donworry.domain.account.entity.Card;
import com.ssafy.donworry.domain.account.repository.CardRepository;
import com.ssafy.donworry.domain.account.repository.query.CardQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
}
