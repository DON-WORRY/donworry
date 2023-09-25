package com.ssafy.donworry.api.controller.finance.dto.response;

import com.ssafy.donworry.domain.finance.entity.Consumption;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record DutchpayTotalResponse(
        Long consumptionId,
        String detail,
        String memberName,
        Long price,
        int reqMemberSize,
        Long myDetailDutchpayId,
        Long dutchpayId, // 정렬 기준
        List<DutchpayPersonResponse> dutchpayPersonList
) {
    public static DutchpayTotalResponse of(Consumption consumption, Long myDetailDutchpayId, Long dutchpayId, List<DutchpayPersonResponse> dutchpayPersonList) {
        return new DutchpayTotalResponse(
                consumption.getId(),
                consumption.getConsumptionDetail(),
                consumption.getMember().getMemberName(),
                consumption.getConsumptionPrice(),
                dutchpayPersonList.size(),
                myDetailDutchpayId,
                dutchpayId,
                dutchpayPersonList
        );
    }
}
