package com.ssafy.donworry.domain.account.repository.datajpa;

import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.member.entity.FriendRelationship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository  extends JpaRepository<Account, Long>{

    void createUserInitAccount(int userId, int bankId);
}
