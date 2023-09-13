package com.ssafy.donworry.api.service.account.query;

import com.ssafy.donworry.domain.account.repository.query.AccountQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountQueryService {
    private final AccountQueryRepository accountQueryRepository;
}
