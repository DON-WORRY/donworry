package com.ssafy.donworry.api.controller.account.dto.response;

import java.time.LocalDateTime;

public record ConsumtionDetailResponse(
        Long consumptionId,
        String category,
        String consumptionDetail,
        Long consumptionPrice,
        LocalDateTime createdTime
) {
    public static ConsumtionDetailResponse of(Long consumptionId,String category, String consumptionDetail, Long consumptionPrice, LocalDateTime createdTime){
        return new ConsumtionDetailResponse(consumptionId,category, consumptionDetail, consumptionPrice, createdTime);
    }
}
