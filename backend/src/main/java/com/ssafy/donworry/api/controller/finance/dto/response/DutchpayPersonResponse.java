package com.ssafy.donworry.api.controller.finance.dto.response;

import com.ssafy.donworry.domain.finance.entity.Dutchpay;
import com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus;

public record DutchpayPersonResponse(
        Long id,
        String name,
        DutchpayStatus dutchpayStatus,
        Long dutchpayReceivedPrice,
        Long dutchpayReqPrice
) {
    public static DutchpayPersonResponse of(Dutchpay dutchpay) {
        return new DutchpayPersonResponse(
                dutchpay.getId(),
                dutchpay.getMember().getMemberName(),
                dutchpay.getDutchpayStatus(),
                dutchpay.getDutchpayReceivedPrice(),
                dutchpay.getDutchpayReqPrice()
        );
    }
}
