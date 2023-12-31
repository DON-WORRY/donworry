package com.ssafy.donworry.domain.finance.repository.query;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.donworry.api.controller.account.dto.response.AccountConsumptionDetailResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.ssafy.donworry.domain.finance.entity.QConsumption.consumption;
import static com.ssafy.donworry.domain.finance.entity.QConsumptionCategory.consumptionCategory;
import static com.ssafy.donworry.domain.finance.entity.QDetailDutchpay.detailDutchpay;
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
                .join(income.detailDutchpay, detailDutchpay)
                .join(detailDutchpay.dutchpay, dutchpay)
                .join(dutchpay.consumption, consumption)
                .join(consumption.consumptionCategory, consumptionCategory)
                .where(income.member.id.eq(memberId),
                        income.detailDutchpay.isNotNull(),
                        income.createdTime.between(startDate.atStartOfDay(), endDate.atStartOfDay())
                )
                .groupBy(consumptionCategory.consumptionCategoryName)
                .fetch();

    }

    public List<Tuple> findIncomeDutchpayPriceByMemberId(Long memberId, Long categoryId, int month) {
        LocalDate startDate = LocalDate.of(LocalDate.now().getYear(), month, 1);
        LocalDate endDate = LocalDate.of(LocalDate.now().getYear(), month, startDate.lengthOfMonth());
        return jpaQueryFactory
                .select(consumption.id, income.incomePrice)
                .from(income)
                .join(income.detailDutchpay, detailDutchpay)
                .join(detailDutchpay.dutchpay, dutchpay)
                .join(dutchpay.consumption, consumption)
                .where(
                        income.detailDutchpay.isNotNull(),
                        income.member.id.eq(memberId),
                        settingCategory(categoryId)
                )
                .fetch();
    }

    public List<AccountConsumptionDetailResponse> findAccountIncomeDetailDpNotNullByAccountId(Long accountId) {
        return jpaQueryFactory
                .select(Projections.constructor(
                                AccountConsumptionDetailResponse.class,
                                income.incomeDetail,
                                consumption.consumptionCategory.consumptionCategoryName,
                                income.incomePrice,
                                income.incomeRemainedAmount,
                                income.createdTime
                        )
                )
                .from(income)
                .join(income.detailDutchpay, detailDutchpay)
                .join(detailDutchpay.dutchpay, dutchpay)
                .join(dutchpay.consumption, consumption)
                .where(
                        income.account.id.eq(accountId),
                        income.detailDutchpay.isNotNull()

                )
                .fetch();
    }

    public List<AccountConsumptionDetailResponse> findAccountIncomeDetailDpNullByAccountId(Long accountId) {
        return jpaQueryFactory
                .select(Projections.constructor(
                                AccountConsumptionDetailResponse.class,
                                income.incomeDetail,
                                Expressions.constant(""),
                                income.incomePrice,
                                income.incomeRemainedAmount,
                                income.createdTime
                        )
                )
                .from(income)
                .where(
                        income.account.id.eq(accountId),
                        income.detailDutchpay.isNull()
                )
                .fetch();
    }

    /**
     * 비즈니스 로직
     */

    private BooleanExpression settingCategory(Long categoryId) {
        return categoryId.equals(0l) ? null : consumption.consumptionCategory.id.eq(categoryId);
    }


}
