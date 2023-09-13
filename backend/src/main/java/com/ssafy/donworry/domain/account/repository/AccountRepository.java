package com.ssafy.donworry.domain.account.repository;

import com.ssafy.donworry.domain.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository  extends JpaRepository<Account, Long>{

    Long findByAccountNumber(String accountNumber);
}
