package com.ssafy.donworry.api.controller.account.dto.response;

import java.util.List;

public record ConsumptionResponse(
        Long cardConsumptionTotalPrice,
        List<eachCardConsumptionTotalPrice> eachCardConsumptionTotalPriceList
) {

}
