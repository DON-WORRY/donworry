package com.ssafy.donworry.api.service.finance.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class CategoryTotalResponse {

    private String total;
    private CategoryAmountResponse categoryAmountResponse;

}
