package com.ssafy.donworry.domain.account.repository.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.donworry.api.controller.account.dto.response.StatisticsResponse;
import com.ssafy.donworry.domain.account.entity.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

import static com.ssafy.donworry.domain.account.entity.QAccount.account;

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

    public List<StatisticsResponse> findStatistics(Long memberId, int month) {
        LocalDateTime startDate = LocalDateTime.of(2023, month, 1, 0, 0);
        LocalDateTime endDate = startDate.plusMonths(1);

//        queryFactory
//                .select()
        return null;
    }

}
