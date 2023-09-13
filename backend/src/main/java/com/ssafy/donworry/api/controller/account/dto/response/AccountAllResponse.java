package com.ssafy.donworry.api.controller.account.dto.response;

import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.account.entity.Bank;
import com.ssafy.donworry.domain.member.entity.Member;

public record AccountAllResponse(
        Long id,
        Member member,
        Bank bank,
        String accountNumber,
        Long holdings
) {


    public Account toEntity() {
        return Account.builder()
                .member(this.member)
                .bank(this.bank)
                .accountNumber(this.accountNumber)
                .holdings(this.holdings)
                .build();
    }
}
