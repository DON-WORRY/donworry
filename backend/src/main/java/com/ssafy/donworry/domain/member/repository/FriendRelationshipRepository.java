package com.ssafy.donworry.domain.member.repository;

import com.ssafy.donworry.domain.member.entity.FriendRelationship;
import com.ssafy.donworry.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FriendRelationshipRepository extends JpaRepository<FriendRelationship, Long> {

    Optional<FriendRelationship> findByReceiverAndSender(Member sender, Member receiver);
}
