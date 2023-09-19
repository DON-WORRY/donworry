package com.ssafy.donworry.domain.account.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.donworry.api.controller.account.dto.response.AccountAllResponse;
import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.account.entity.QAccount;
import com.ssafy.donworry.domain.member.entity.QMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.ssafy.donworry.domain.account.entity.QAccount.account;
import static com.ssafy.donworry.domain.member.entity.QMember.member;

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
}
