package com.ssafy.donworry.api.controller.finance.requestdto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CategoryModifyRequest {
    private Long consumptionId;
    private Long consumptionCategoryId;
}
