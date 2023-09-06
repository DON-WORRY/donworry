package com.ssafy.donworry.domain.account.repository.datajpa;

import com.ssafy.donworry.domain.account.entity.Bank;
import com.ssafy.donworry.domain.member.entity.FriendRelationship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankRepository  extends JpaRepository<Bank, Long>{

}
