package com.ssafy.donworry.api.controller.account.dto.response;

import java.util.List;

public record AccountAllResponse(

//        Member member,
//        Long id,
//        String bankName,
//        Long accuntAmount

        Long total,
        List<AccountSummaryResponse> accounts
) {

    public static AccountAllResponse of(long total, List<AccountSummaryResponse> accountSummaryResponse){
        return new AccountAllResponse(total, accountSummaryResponse);
    }

}
