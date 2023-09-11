package com.ssafy.donworry.api.controller.finance;

import com.ssafy.donworry.api.controller.finance.dto.request.DutchPayCreateRequest;
import com.ssafy.donworry.common.api.ApiResult;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/dutchpay")
@RequiredArgsConstructor
public class DutchPayController {

    @Operation(summary = "더치페이 요청", description = "해당 거래내역에서 더치페이를 요청할 수 있는 API입니다.")
    @PostMapping("/create")
    public ApiResult<Long> createDutchPay(@RequestBody DutchPayCreateRequest dutchPayCreateRequest) {
        log.info("createDutchPay : " + dutchPayCreateRequest.getId());
        log.info("createDutchPay : " + dutchPayCreateRequest.getReqAmountList().get(0).getMemberid());


        return null;
    }

}
