package com.ssafy.donworry.domain.finance.repository.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.donworry.domain.finance.entity.Consumption;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.donworry.domain.finance.entity.QConsumption.consumption;


@Repository
@Slf4j
@RequiredArgsConstructor
public class ConsumptionQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public Long findTotalByMemberId(Long memberId) {
        log.info("memberId : " + memberId);
        return jpaQueryFactory
                .select(consumption.consumptionPrice.sum())
                .from(consumption)
//                .where(consumption.consumptionCategory.id.eq(1l))
                .fetchOne();

    }
}
