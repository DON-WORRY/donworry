package com.ssafy.donworry.api.controller.finance.dto.response;

import com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus;

public record DutchpayPersonResponse(
        Long id,
        String name,
        DutchpayStatus dutchpayStatus,
        Long dutchpayReceivedPrice,
        Long dutchpayReqPrice
) {
}
