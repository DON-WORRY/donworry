package com.ssafy.donworry.api.controller.finance.dto.response;

import com.ssafy.donworry.domain.finance.entity.Consumption;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record DutchpayTotalResponse(
        String detail,
        String memberName,
        Long price,
        int reqMemberSize,
        List<DutchpayPersonResponse> dutchpayPersonList
) {
    public static DutchpayTotalResponse of(Consumption consumption, List<DutchpayPersonResponse> dutchpayPersonList) {
        return new DutchpayTotalResponse(
                consumption.getConsumptionDetail(),
                consumption.getMember().getMemberName(),
                consumption.getConsumptionPrice(),
                dutchpayPersonList.size(),
                dutchpayPersonList
        );
    }
}
