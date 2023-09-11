package com.ssafy.donworry.api.service.account.command;

import com.ssafy.donworry.domain.account.repository.datajpa.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;

    public void createUserInitAccount(int userId, int bankId) {
        accountRepository.createUserInitAccount(userId, bankId);
    }
}
