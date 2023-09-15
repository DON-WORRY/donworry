package com.ssafy.donworry.api.controller.account.dto.response;

import java.time.LocalDateTime;

public record AccountDetailResponse(
        String consumptionDetail,
        Long consumptionPrice,
        Long consumptionRemainedAmount,
        LocalDateTime createTime,
        String cardName
) {

}
