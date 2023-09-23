package com.ssafy.donworry.domain.member.repository;

import com.ssafy.donworry.domain.member.entity.FriendRelationship;
import com.ssafy.donworry.domain.member.entity.FriendRequest;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.entity.enums.FriendRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

    List<FriendRequest> findAllByReceiver(Member member);
    List<FriendRequest> findAllBySender(Member member);

    Optional<FriendRequest> findByReceiverAndSenderAndFriendRequestStatus(Member sender, Member receiver, FriendRequestStatus friendRequestStatus);
}
