package com.ssafy.donworry.domain.account.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.donworry.api.controller.account.dto.response.StatisticsResponse;
import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.finance.entity.QConsumption;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static com.ssafy.donworry.domain.account.entity.QAccount.account;
import static com.ssafy.donworry.domain.finance.entity.QConsumption.consumption;
import static com.ssafy.donworry.domain.finance.entity.QIncome.income;

@Repository
@RequiredArgsConstructor
public class AccountQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<Account> findByMemberId(Long memberId) {
        return  queryFactory
                .select(account)
                .from(account)
                .where(account.member.id.eq(memberId))
                .fetch();
    }

    public List<Account> findByAccountId(Long accountId) {
        return queryFactory
                .select(account)
                .from(account)
                .where(account.id.eq(accountId))
                .fetch();
    }

    public List<StatisticsResponse> findStatisticsOfConsumption(Long memberId, LocalDate startDate) {
//        LocalDate startDate = LocalDate.of(2023, month, 1);
        LocalDate endDate = startDate.plusMonths(1);

        List<StatisticsResponse> list = queryFactory
                .select(Projections.constructor(StatisticsResponse.class,
                        consumption.account.id,
                        consumption.createdTime.max(),
                        consumption.consumptionRemainedAmount.max()
                ))
                .from(consumption)
                .where(
                        consumption.member.id.eq(memberId),
                        consumption.createdTime.goe(startDate.atStartOfDay()),
                        consumption.createdTime.lt(endDate.atStartOfDay())
                )
                .groupBy(consumption.account.id)
                .fetch();

        return list;
    }

    public List<StatisticsResponse> findStatisticsOfInCome(Long memberId, LocalDate startDate) {
        LocalDate endDate = startDate.plusMonths(1);

        List<StatisticsResponse> list = queryFactory
                .select(Projections.constructor(StatisticsResponse.class,
                        income.account.id,
                        income.createdTime.max(),
                        income.incomeRemainedAmount.max()
                ))
                .from(income)
                .where(
                        income.member.id.eq(memberId),
                        income.createdTime.goe(startDate.atStartOfDay()),
                        income.createdTime.lt(endDate.atStartOfDay())
                )
                .groupBy(income.account.id)
                .fetch();
        return list;
    }
}
