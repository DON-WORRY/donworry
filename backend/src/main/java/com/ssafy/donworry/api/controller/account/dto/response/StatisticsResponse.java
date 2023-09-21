package com.ssafy.donworry.api.controller.account.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record StatisticsResponse(
        Long accountId,
        LocalDateTime time,
        Long accountAmount
) {
    public static StatisticsResponse of(Long accountId, LocalDate time, Long accountAmount){
        return new StatisticsResponse(accountId, time.atStartOfDay(), accountAmount);
    }

}
