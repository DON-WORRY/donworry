package com.ssafy.donworry.domain.account.repository.datajpa;

import com.ssafy.donworry.domain.account.entity.CardCompany;
import com.ssafy.donworry.domain.member.entity.FriendRelationship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardCompanyRepository  extends JpaRepository<CardCompany, Long>{

}
