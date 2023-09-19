package com.ssafy.donworry.domain.finance.repository.query;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.donworry.domain.finance.entity.QConsumptionCategory.consumptionCategory;
import static com.ssafy.donworry.domain.finance.entity.QIncome.income;

@Repository
@RequiredArgsConstructor
public class IncomeQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

//    public List<Tuple> findIncomeByMemberId(Long memberId) {
//        return jpaQueryFactory
//                .select(consumptionCategory.consumptionCategoryName, income.incomePrice.sum())
//                .from(income)
//                .join(income.dutchpay, dutchpay)
//
//    }

}
