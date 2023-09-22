package com.ssafy.donworry.domain.account.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.donworry.api.controller.account.dto.response.CardInfoResponse;
import com.ssafy.donworry.api.controller.account.dto.response.ConsumtionDetailResponse;
import com.ssafy.donworry.api.controller.account.dto.response.eachCardConsumptionTotalPrice;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.donworry.domain.account.entity.QAccount.account;
import static com.ssafy.donworry.domain.account.entity.QCard.card;
import static com.ssafy.donworry.domain.account.entity.QCardCompany.cardCompany;
import static com.ssafy.donworry.domain.finance.entity.QConsumption.consumption;
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

//    public List<eachCardConsumptionTotalPrice> findALlEachCardTotalPrice(Long memberId, Long month) {
//        List<Tuple> result = queryFactory
//                .select(
//                        Projections.fields(eachCardConsumptionTotalPrice.class,
//                                consumption.card.id.as("cardId")),
//                                consumption.card.cardCompany.cardCompanyName,
//                                consumption.consumptionPrice
//                )
//                .from(consumption)
//                .leftJoin(card).on(consumption.card.id.eq(card.id))
//                .leftJoin(cardCompany).on(card.cardCompany.id.eq(cardCompany.id))
////                .where(consumption.member.id.eq(memberId),
////                        consumption.createdTime.month().eq(Math.toIntExact(month))
////                )
////                .groupBy(consumption.card.id)
//                .fetch();
//
//        return queryFactory
//                .select(
//                        Projections.fields(
//                                eachCardConsumptionTotalPrice.class,
//                                consumption.card.id.as("cardId"),
//                                consumption.card.cardCompany.cardCompanyName,
//                                consumption.consumptionPrice.sum().as("consumptionTotalPrice")
//                        )
//                )
//                .from(consumption)
//                .leftJoin(card).on(consumption.card.id.eq(card.id))
//                .leftJoin(cardCompany).on(card.cardCompany.id.eq(cardCompany.id))
//                .where(consumption.member.id.eq(memberId),
//                        consumption.createdTime.month().eq(Math.toIntExact(month))
//                        )
//                .groupBy(consumption.card.id)
//                .fetch();
//
//    }
    public List<eachCardConsumptionTotalPrice> findALlEachCardTotalPrice(Long memberId, Long month) {
        List<eachCardConsumptionTotalPrice> resultList = queryFactory
                .select(
                        Projections.constructor(
                                eachCardConsumptionTotalPrice.class,
                                card.id.as("cardId"),
                                cardCompany.cardCompanyName.as("cardCompanyName"),
                                consumption.consumptionPrice.sum().as("consumptionTotalPrice")
                        )
                )
                .from(consumption)
                .join(consumption.card, card)
                .join(card.cardCompany, cardCompany)
                .where(
                        consumption.member.id.eq(memberId),
                        consumption.createdTime.month().eq(Math.toIntExact(month)),
                        consumption.member.id.eq(memberId),
                        consumption.createdTime.month().eq(Math.toIntExact(month))
                )
                .groupBy(consumption.card.id)
                .fetch();

        return resultList;
    }


    public List<ConsumtionDetailResponse> findEachCardOfMonthDetailConsumption(Long cardId, Long year, Long month) {
        List<ConsumtionDetailResponse> result = queryFactory
                .select(
                        Projections.constructor(
                                ConsumtionDetailResponse.class,
                                consumption.id,
                                consumption.consumptionDetail,
                                consumption.consumptionPrice,
                                consumption.createdTime
                        )
                )
                .from(consumption)
                .where(consumption.createdTime.month().eq(Math.toIntExact(month)),
                        consumption.createdTime.year().eq(Math.toIntExact(year)),
                        consumption.card.id.eq(cardId))
                .fetch();
        return result;
    }
}