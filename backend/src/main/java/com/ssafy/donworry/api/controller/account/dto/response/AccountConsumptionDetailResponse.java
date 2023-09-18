package com.ssafy.donworry.api.controller.account.dto.response;

import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.finance.entity.Consumption;

import java.time.LocalDateTime;

public record AccountConsumptionDetailResponse(
        String consumptionDetail,
        Long consumptionPrice,
        Long consumptionRemainedAmount,
        LocalDateTime createTime,
        String cardName
) {

    public static AccountConsumptionDetailResponse of(Consumption consumption) {
        return new AccountConsumptionDetailResponse(
                consumption.getConsumptionDetail(),
                consumption.getConsumptionPrice(),
                consumption.getConsumptionRemainedAmount(),
                consumption.getCreatedTime(),
                consumption.getCard().getCardCompany().getCardCompanyName()
        );
    }
}
