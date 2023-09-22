package com.ssafy.donworry.domain.finance.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayPersonResponse;
import com.ssafy.donworry.domain.finance.entity.DetailDutchpay;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.donworry.domain.finance.entity.QDetailDutchpay.detailDutchpay;
import static com.ssafy.donworry.domain.member.entity.QMember.member;

@Repository
@RequiredArgsConstructor
public class DetailDutchpayQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;
    public List<DutchpayPersonResponse> searchDutchpayPersonList(Long memberId) {
//        List<DetailDutchpay> detailDutchpayList = jpaQueryFactory
//                .selectFrom(detailDutchpay)
//                .join(detailDutchpay.member, member)
//                .where(member.id.eq(memberId))
        return null;

    }
}
