package com.ssafy.donworry.api.controller.finance.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class DutchPayCreateRequest {
    private Long id;
    private List<ReqAmountRequest> reqAmountList;
}
