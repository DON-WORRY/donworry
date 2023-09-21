package com.ssafy.donworry.domain.member.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.donworry.api.controller.member.dto.response.FriendRequestResponse;
import com.ssafy.donworry.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class FriendRequestQueryRepository {

    private final JPAQueryFactory queryFactory;

    public List<FriendRequestResponse> findSenders(Member member){
        return queryFactory
                .select(Projections.constructor(FriendRequestResponse.class,


                ))
                .from()

    }

    public List<FriendRequestResponse> findReceivers(){
        return null;

    }
}
