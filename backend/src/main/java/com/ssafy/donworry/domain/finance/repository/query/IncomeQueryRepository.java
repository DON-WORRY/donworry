package com.ssafy.donworry.domain.finance.repository.query;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.ssafy.donworry.domain.finance.entity.QConsumption.consumption;
import static com.ssafy.donworry.domain.finance.entity.QConsumptionCategory.consumptionCategory;
import static com.ssafy.donworry.domain.finance.entity.QDutchpay.dutchpay;
import static com.ssafy.donworry.domain.finance.entity.QIncome.income;

@Repository
@RequiredArgsConstructor
public class IncomeQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<Tuple> findIncomeCategoryTotal(Long memberId, int month) {
        LocalDate startDate = LocalDate.of(LocalDate.now().getYear(), month, 1);
        LocalDate endDate = LocalDate.of(LocalDate.now().getYear(), month, startDate.lengthOfMonth());

        return jpaQueryFactory
                .select(consumptionCategory.consumptionCategoryName, income.incomePrice.sum())
                .from(income)
                .join(income.dutchpay, dutchpay)
                .join(dutchpay.consumption, consumption)
                .join(consumption.consumptionCategory, consumptionCategory)
                .where(income.member.id.eq(memberId),
                        income.dutchpay.isNotNull(),
                        consumption.createdTime.between(startDate.atStartOfDay(), endDate.atStartOfDay()))
                .groupBy(consumptionCategory.consumptionCategoryName)
                .fetch();

    }

    public List<Tuple> findIncomeDutchpayPriceByMemberId(Long memberId, Long categoryId) {
        return jpaQueryFactory
                .select(income.dutchpay.consumption.id, income.incomePrice)
                .from(income)
                .where(income.member.id.eq(memberId)
                        .and(income.dutchpay.isNotNull()))
                .fetch();
    }

}
