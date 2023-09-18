package com.ssafy.donworry.api.controller.account.dto.response;

import com.ssafy.donworry.domain.finance.entity.Consumption;

import java.time.LocalDateTime;

public record StatisticsMonthAvg(
        LocalDateTime time,
        Long accountAmount
) {
    public static StatisticsMonthAvg of(Consumption consumption) {
        return null;
        //        return new StatisticsMonthAvg(
//                consumption.getCreatedTime(),
//                consumption.get
//        )
    }
}
