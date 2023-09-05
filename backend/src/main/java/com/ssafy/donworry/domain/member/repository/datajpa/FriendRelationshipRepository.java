package com.ssafy.donworry.domain.member.repository.datajpa;

import com.ssafy.donworry.domain.member.entity.FriendRelationship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRelationshipRepository extends JpaRepository<FriendRelationship, Long> {

}
