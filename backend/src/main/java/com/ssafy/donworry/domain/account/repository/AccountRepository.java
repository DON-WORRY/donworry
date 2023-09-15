package com.ssafy.donworry.domain.account.repository;

import com.ssafy.donworry.api.controller.account.dto.response.AccountAllResponse;
import com.ssafy.donworry.domain.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountRepository  extends JpaRepository<Account, Long>{

    Long findByAccountNumber(String accountNumber);

    boolean existsByAccountNumber(String string);

}
