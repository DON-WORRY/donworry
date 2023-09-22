package com.ssafy.donworry.api.controller.finance;

import com.ssafy.donworry.api.controller.finance.dto.request.DutchpayCreateRequest;
import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayPersonResponse;
import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayTotalResponse;
import com.ssafy.donworry.api.service.finance.DutchpayService;
import com.ssafy.donworry.api.service.finance.query.DutchpayQueryService;
import com.ssafy.donworry.common.model.UserDetailsModel;
import com.ssafy.donworry.common.response.ApiData;
import com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/dutchpay")
@RequiredArgsConstructor
public class DutchpayController {
    private final DutchpayService dutchpayService;
    private final DutchpayQueryService dutchpayQueryService;

    @Operation(summary = "더치페이 요청", description = "해당 거래내역에서 더치페이를 요청할 수 있는 API입니다.")
    @PostMapping("/create")
    public ApiData<DutchpayTotalResponse> createDutchpay(@AuthenticationPrincipal UserDetailsModel userDetailsModel,
                                                         @RequestBody DutchpayCreateRequest dutchpayCreateRequest) {
        log.info("createDutchpay : {}", dutchpayCreateRequest.consumptionId());
        Long memberId = userDetailsModel.getId();

        DutchpayTotalResponse dutchpayTotalResponse = dutchpayService.createDutchpay(dutchpayCreateRequest, memberId);
        return ApiData.of(dutchpayTotalResponse);
    }

    @Operation(summary = "더치페이 조회", description = "현재 사용자가 요청한 더치페이 항목을 조회할 수 있는 API입니다.")
    @GetMapping("")
    public ApiData<List<List<DutchpayPersonResponse>>> searchDutchpayPerson(@AuthenticationPrincipal UserDetailsModel userDetailsModel) {
        Long memberId = userDetailsModel.getId();
        log.info("searchDutchpayPerson : " + memberId);
        List<List<DutchpayPersonResponse>> dutchpayPersonResponseList = dutchpayQueryService.searchDutchpay(memberId);

        return ApiData.of(dutchpayPersonResponseList);
    }

    @Operation(summary = "더치페이 완료", description = "더치페이에서 한 멤버의 상태를 완료할 수 있는 API입니다.")
    @PutMapping("/complete/{id}")
    public ApiData<Long> completePersonDutchpay(@PathVariable("id") Long dutchpayId,
                                          @RequestParam Long memberId){
        log.info("completeDutchpay1 : " + memberId);
        return null;
    }

    @Operation(summary = "더치페이 전체 완료", description = "해당 더치페이를 완료할 수 있는 API입니다.")
    @PostMapping("/complete/{id}")
    public ApiData<Long> completeDutchpay(@PathVariable("id") Long dutchpayId) {
        log.info("completeDutchpay2 : " + dutchpayId);
        return null;
    }

//    @Operation(summary = "더치페이 송금", description = "더치페이에 대한 송금을 할 수 있는 API입니다.")
//    @PostMapping("/transfer")

}
