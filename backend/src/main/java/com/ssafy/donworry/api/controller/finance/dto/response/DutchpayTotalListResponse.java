package com.ssafy.donworry.api.controller.finance.dto.response;

import java.util.List;

public record DutchpayTotalListResponse(
        List<DutchpayTotalResponse> sendDutchpayTotalList,
        List<DutchpayTotalResponse> receiveDutchpayTotalList
) {
    public static DutchpayTotalListResponse of(List<DutchpayTotalResponse> sendDutchpayList,
                                               List<DutchpayTotalResponse> receiveDutchpayList) {
        return new DutchpayTotalListResponse(
                sendDutchpayList,
                receiveDutchpayList
        );
    }
}
