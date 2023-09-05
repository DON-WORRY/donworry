package com.ssafy.donworry.domain.finance.repository.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class IncomeQueryRepository {

    private final JPAQueryFactory queryFactory;

}
