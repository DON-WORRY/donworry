package com.ssafy.donworry.api.controller.account.dto.response;

import lombok.Builder;

public record eachCardConsumptionTotalPrice(
        Long cardId,
        String cardCompanyName,
        Long consumptionTotalPrice
)       {
        public static eachCardConsumptionTotalPrice of(Long cardId, String cardCompanyName, Long consumptionTotalPrice){
                return new eachCardConsumptionTotalPrice(cardId, cardCompanyName, consumptionTotalPrice);
        }


}
