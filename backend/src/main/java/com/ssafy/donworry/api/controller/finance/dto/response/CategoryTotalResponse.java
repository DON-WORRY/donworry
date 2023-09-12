package com.ssafy.donworry.api.controller.finance.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class CategoryTotalResponse {

    private Long total;
    private CategoryAmountResponse categoryAmountResponse;

}
