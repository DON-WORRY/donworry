package com.ssafy.donworry.api.controller.finance.requestdto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReqAmountRequest {
    private Long memberid;
    private Long amount;
}
