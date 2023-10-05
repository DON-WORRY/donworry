package com.ssafy.donworry.domain.account.repository;

import com.ssafy.donworry.domain.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository  extends JpaRepository<Account, Long>{

    Account findByAccountNumber(String accountNumber);

    boolean existsByAccountNumber(String accountNumber);

    Account findFirstByMemberId(Long memberId);
}
