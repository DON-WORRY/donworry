package com.ssafy.donworry.domain.account.repository.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AccountQueryRepository {
    private final JPAQueryFactory queryFactory;
}
