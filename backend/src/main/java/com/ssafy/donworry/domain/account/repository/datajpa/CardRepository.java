package com.ssafy.donworry.domain.account.repository.datajpa;

import com.ssafy.donworry.domain.account.entity.Card;
import com.ssafy.donworry.domain.member.entity.FriendRelationship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long>{

}
