package com.ssafy.donworry.api.controller.finance;

import com.ssafy.donworry.api.controller.finance.dto.request.DutchpayCreateRequest;
import com.ssafy.donworry.api.controller.finance.dto.request.DutchpayTransferRequest;
import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayTotalListResponse;
import com.ssafy.donworry.api.service.finance.DutchpayService;
import com.ssafy.donworry.api.service.finance.query.DutchpayQueryService;
import com.ssafy.donworry.common.model.UserDetailsModel;
import com.ssafy.donworry.common.response.ApiData;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/dutchpay")
@RequiredArgsConstructor
public class DutchpayController {
    private final DutchpayService dutchpayService;
    private final DutchpayQueryService dutchpayQueryService;

    @Operation(summary = "더치페이 요청", description = "해당 거래내역에서 더치페이를 요청할 수 있는 API입니다.")
    @PostMapping("/create")
    public ApiData<Long> createDutchpay(@AuthenticationPrincipal UserDetailsModel userDetailsModel,
                                                         @RequestBody DutchpayCreateRequest dutchpayCreateRequest) {
        log.info("createDutchpay : {}", dutchpayCreateRequest.consumptionId());
        Long memberId = userDetailsModel.getId();

        Long dutchpayId = dutchpayService.createDutchpay(dutchpayCreateRequest, memberId);
        return ApiData.of(dutchpayId);
    }

    @Operation(summary = "더치페이 조회", description = "현재 사용자가 요청한 더치페이 항목을 조회할 수 있는 API입니다.")
    @GetMapping("")
    public ApiData<DutchpayTotalListResponse> searchDutchpayTotal(@AuthenticationPrincipal UserDetailsModel userDetailsModel) {
        Long memberId = userDetailsModel.getId();
        log.info("searchDutchpayPerson : " + memberId);
        DutchpayTotalListResponse dutchpayTotalList = dutchpayQueryService.searchDutchpay(memberId);

        return ApiData.of(dutchpayTotalList);
    }

    @Operation(summary = "더치페이 전체 완료", description = "해당 더치페이를 완료할 수 있는 API입니다.")
    @PostMapping("/complete/{id}")
    public ApiData<Long> completeDutchpay(@PathVariable("id") Long dutchpayId) {
        log.info("completeDutchpay2 : " + dutchpayId);
        return null;
    }

    @Operation(summary = "더치페이 송금", description = "더치페이에 대한 송금을 할 수 있는 API입니다.")
    @PostMapping("/transfer")
    public ApiData<Long> transferByDetailDutchpay(@AuthenticationPrincipal UserDetailsModel userDetailsModel,
                                  @RequestBody DutchpayTransferRequest dutchpayTransferRequest) {
        Long memberId = userDetailsModel.getId();
        Long result = dutchpayService.dutchpayTransfer(memberId, dutchpayTransferRequest);
        return ApiData.of(result);
    }

}
