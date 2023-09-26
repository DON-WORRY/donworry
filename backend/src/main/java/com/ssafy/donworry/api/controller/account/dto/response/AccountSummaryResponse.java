package com.ssafy.donworry.api.controller.account.dto.response;

import com.ssafy.donworry.domain.account.entity.Account;

public record AccountSummaryResponse(

        Long accountId,
        String bankName,
        String accountNumber,
        Long amount
) {

    public static AccountSummaryResponse of(Account account){
        return new AccountSummaryResponse(
                account.getId(),
                account.getBank().getName(),
                account.getAccountNumber(),
                account.getAccountAmount()
        );
    }

}
