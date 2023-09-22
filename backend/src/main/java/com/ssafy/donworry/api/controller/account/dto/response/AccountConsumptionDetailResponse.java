package com.ssafy.donworry.api.controller.account.dto.response;

import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.finance.entity.Consumption;
import com.ssafy.donworry.domain.finance.entity.Income;

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

    public static AccountConsumptionDetailResponse of(Income income) {
        return new AccountConsumptionDetailResponse(
                income.getIncomeDetail(),
                income.getIncomePrice(),
                income.getIncomeRemainedAmount(),
                income.getCreatedTime(),
                income.getIncomeDetail()
        );
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }
}
