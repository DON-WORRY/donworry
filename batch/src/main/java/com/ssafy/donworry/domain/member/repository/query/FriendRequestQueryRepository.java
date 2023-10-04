package com.ssafy.donworry.domain.member.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.donworry.api.controller.member.dto.response.FriendRequestResponse;
import com.ssafy.donworry.api.controller.member.dto.response.FriendResponse;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.entity.QFriendRelationship;
import com.ssafy.donworry.domain.member.entity.QMember;
import com.ssafy.donworry.domain.member.entity.enums.FriendRequestStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.donworry.domain.member.entity.QFriendRelationship.friendRelationship;
import static com.ssafy.donworry.domain.member.entity.QFriendRequest.friendRequest;
import static com.ssafy.donworry.domain.member.entity.QMember.member;

@Repository
@RequiredArgsConstructor
public class FriendRequestQueryRepository {

    private final JPAQueryFactory queryFactory;

    public List<FriendRequestResponse> findSenders(Member member1){
        return queryFactory
                .select(Projections.constructor(FriendRequestResponse.class,
                        friendRequest.id,
                        friendRequest.sender.id,
                        friendRequest.sender.memberEmail,
                        friendRequest.sender.memberName,
                        friendRequest.sender.createdTime
                ))
                .from(friendRequest)
                .join(friendRequest.receiver, member)
                .on(friendRequest.friendRequestStatus.eq(FriendRequestStatus.ACTIVE)
                        .and(member.eq(member1))
                )
                .fetch();
    }

    public List<FriendRequestResponse> findReceivers(Member member1){
        return queryFactory
                .select(Projections.constructor(FriendRequestResponse.class,
                        friendRequest.id,
                        friendRequest.receiver.id,
                        friendRequest.receiver.memberEmail,
                        friendRequest.receiver.memberName,
                        friendRequest.receiver.createdTime
                ))
                .from(friendRequest)
                .join(friendRequest.sender, member)
                .on(friendRequest.friendRequestStatus.eq(FriendRequestStatus.ACTIVE)
                        .and(member.eq(member1))
                )
                .fetch();
    }

}
