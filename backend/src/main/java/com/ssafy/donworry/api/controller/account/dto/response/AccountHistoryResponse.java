package com.ssafy.donworry.api.controller.account.dto.response;

import java.util.List;

public record AccountHistoryResponse(
        List<AccountConsumptionDetailResponse> list
) {
    public static AccountHistoryResponse of(List<AccountConsumptionDetailResponse> list){
        return new AccountHistoryResponse(list);
    }
}
