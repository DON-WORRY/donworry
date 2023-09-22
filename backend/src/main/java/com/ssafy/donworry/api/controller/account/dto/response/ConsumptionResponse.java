package com.ssafy.donworry.api.controller.account.dto.response;

import java.util.List;

public record ConsumptionResponse(
        Long cardConsumptionTotalPrice,
        List<eachCardConsumptionTotalPrice> eachCardConsumptionTotalPriceList
) {
    public static ConsumptionResponse of(Long cardConsumptionTotalPrice, List<eachCardConsumptionTotalPrice> eachCardConsumptionTotalPriceList) {
        return new ConsumptionResponse(cardConsumptionTotalPrice, eachCardConsumptionTotalPriceList);
    }

}
