package com.ssafy.donworry.domain.finance.repository.query;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.donworry.api.controller.finance.dto.response.CategoryHistoryResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.donworry.domain.finance.entity.QConsumption.consumption;
import static com.ssafy.donworry.domain.finance.entity.QConsumptionCategory.consumptionCategory;
import static com.ssafy.donworry.domain.member.entity.QMember.member;


@Repository
@Slf4j
@RequiredArgsConstructor
public class ConsumptionQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public List<Tuple> findConsumptionCategoryTotal(Long memberId) {
        return jpaQueryFactory
                .select(consumptionCategory.consumptionCategoryName, consumption.consumptionPrice.sum())
                .from(consumption)
                .join(consumption.consumptionCategory, consumptionCategory)
                .groupBy(consumptionCategory.consumptionCategoryName)
                .where(consumption.member.id.eq(memberId))
                .fetch();

    }

    public List<CategoryHistoryResponse> findConsumptionCategoryHistory(Long memberId, Long categoryId) {
        return jpaQueryFactory
                .select(Projections.constructor(CategoryHistoryResponse.class,
                        consumption.id,
                        consumption.consumptionDetail,
                        consumption.account.bank.name,
                        consumption.consumptionPrice,
                        consumption.createdTime
                        ))
                .from(consumption)
                .where(consumption.member.id.eq(memberId))
                .fetch();
    }
}
