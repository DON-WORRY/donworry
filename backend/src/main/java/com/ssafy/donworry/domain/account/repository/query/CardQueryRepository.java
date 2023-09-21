package com.ssafy.donworry.domain.account.repository.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.donworry.api.controller.account.CardInfoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.donworry.domain.account.entity.QAccount.account;
import static com.ssafy.donworry.domain.account.entity.QCard.card;
import static com.ssafy.donworry.domain.account.entity.QCardCompany.cardCompany;
import static com.ssafy.donworry.domain.member.entity.QMember.member;

@Repository
@RequiredArgsConstructor
public class CardQueryRepository {

    private final JPAQueryFactory queryFactory;

    public List<CardInfoResponse> findCardInfoByMemberId(Long memberId) {
        return queryFactory
                .select(card.id, cardCompany.cardCompanyName, card.cardNumber)
                .from(card)
                .leftJoin(card.cardCompany, cardCompany)
                .leftJoin(card.account, account)
                .leftJoin(account.member, member)
                .where(member.id.eq(memberId))
                .fetch()
                .stream()
                .map(tuple -> CardInfoResponse.of(
                        tuple.get(card.id),
                        tuple.get(cardCompany.cardCompanyName),
                        tuple.get(card.cardNumber)
                ))
                .toList();


    }
}
