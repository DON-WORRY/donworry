package com.ssafy.donworry.domain.finance.repository.query;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.ssafy.donworry.domain.finance.entity.QConsumption.consumption;
import static com.ssafy.donworry.domain.finance.entity.QConsumptionCategory.consumptionCategory;
import static com.ssafy.donworry.domain.finance.entity.QIncome.income;


@Repository
@Slf4j
@RequiredArgsConstructor
public class ConsumptionQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public List<Tuple> findConsumptionCategoryTotal(Long memberId, int month) {
        LocalDate startDate = LocalDate.of(LocalDate.now().getYear(), month, 1);
        LocalDate endDate = LocalDate.of(LocalDate.now().getYear(), month, startDate.lengthOfMonth());

        return jpaQueryFactory
                .select(consumptionCategory.id, consumptionCategory.consumptionCategoryName, consumption.consumptionPrice.sum())
                .from(consumption)
                .join(consumption.consumptionCategory, consumptionCategory)
                .groupBy(consumptionCategory.id)
                .where(
                        consumption.member.id.eq(memberId),
                        consumption.createdTime.between(startDate.atStartOfDay(), endDate.atStartOfDay())
                )
                .fetch();

    }

    private BooleanExpression settingCategory(Long categoryId) {
        return categoryId.equals(0l) ? null : consumption.consumptionCategory.id.eq(categoryId);
    }

}
