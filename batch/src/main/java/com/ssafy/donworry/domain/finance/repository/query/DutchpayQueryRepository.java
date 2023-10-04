package com.ssafy.donworry.domain.finance.repository.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.donworry.domain.finance.entity.QConsumption.consumption;
import static com.ssafy.donworry.domain.finance.entity.QDutchpay.dutchpay;

@Repository
@RequiredArgsConstructor
public class DutchpayQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public List<Long> searchConsumptionList(Long memberId) {
        return jpaQueryFactory
                .select(dutchpay.consumption.id)
                .from(dutchpay)
                .join(dutchpay.consumption, consumption)
                .distinct()
                .fetch();
    }
}
