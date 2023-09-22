package com.ssafy.donworry.domain.member.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.donworry.api.controller.member.dto.response.FriendResponse;
import com.ssafy.donworry.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.donworry.domain.member.entity.QFriendRelationship.friendRelationship;
import static com.ssafy.donworry.domain.member.entity.QMember.member;

@Repository
@RequiredArgsConstructor
public class FriendRelationshipQueryRepository {

    private final JPAQueryFactory queryFactory;

    public List<FriendResponse> findSenderFriend(Member sender){
        return queryFactory
                .select(Projections.constructor(FriendResponse.class,
                        friendRelationship.sender.id,
                        friendRelationship.sender.memberName,
                        friendRelationship.sender.memberEmail
                ))
                .from(friendRelationship)
                .join(friendRelationship.sender, member)
                .on(member.eq(sender))
                .fetch();
    }

    public List<FriendResponse> findReceiverFriend(Member receiver){
        return queryFactory
                .select(Projections.constructor(FriendResponse.class,
                        friendRelationship.receiver.id,
                        friendRelationship.receiver.memberName,
                        friendRelationship.receiver.memberEmail
                ))
                .from(friendRelationship)
                .join(friendRelationship.sender, member)
                .on(member.eq(receiver))
                .fetch();
    }
}
