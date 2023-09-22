package com.ssafy.donworry.api.controller.finance.dto.response;

import com.ssafy.donworry.domain.finance.entity.DetailDutchpay;
import com.ssafy.donworry.domain.finance.entity.Dutchpay;
import com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus;

public record DutchpayPersonResponse(
        Long detailDutchpayId,
        String name,
        DutchpayStatus dutchpayStatus,
        Long dutchpayReceivedPrice,
        Long dutchpayReqPrice
) {
    public static DutchpayPersonResponse of(DetailDutchpay detailDutchpay) {
        return new DutchpayPersonResponse(
                detailDutchpay.getId(),
                detailDutchpay.getMember().getMemberName(),
                detailDutchpay.getDutchpayStatus(),
                detailDutchpay.getDutchpayReceivedPrice(),
                detailDutchpay.getDutchpayReqPrice()
        );
    }
}
