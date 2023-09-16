package com.ssafy.donworry.api.controller.account.dto.response;

import java.util.List;

public record StatisticsResponse(
        List<StatisticsMonthAvg> statisticsMonthAvgList
) {
    public static StatisticsResponse of(List<StatisticsMonthAvg> statisticsMonthAvgList){
        return new StatisticsResponse(statisticsMonthAvgList);
    }
}
