package com.ssafy.donworry.api.controller.account.dto.response;
import java.time.LocalDateTime;

public record AccountConsumptionDetailResponse(
        String consumptionDetail,
        String category,
        Long consumptionPrice,
        Long consumptionRemainedAmount,
        LocalDateTime createTime
) {



    public LocalDateTime getCreateTime() {
        return createTime;
    }

}
