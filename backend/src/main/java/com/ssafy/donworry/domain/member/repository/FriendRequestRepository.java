package com.ssafy.donworry.domain.member.repository;

import com.ssafy.donworry.domain.member.entity.FriendRequest;
import com.ssafy.donworry.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

    List<FriendRequest> findAllByReceiver(Member member);
    List<FriendRequest> findAllBySender(Member member);
}
