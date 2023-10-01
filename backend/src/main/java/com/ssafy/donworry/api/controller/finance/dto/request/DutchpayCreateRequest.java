package com.ssafy.donworry.api.controller.finance.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record DutchpayCreateRequest(
        @NotNull Long consumptionId,
        @NotNull List<ReqAmountRequest> reqAmountList
) {

}
