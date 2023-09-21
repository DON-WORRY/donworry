package com.ssafy.donworry.api.controller.finance;

import com.ssafy.donworry.api.controller.finance.dto.request.DutchpayCreateRequest;
import com.ssafy.donworry.api.controller.finance.dto.response.DutchpayPersonResponse;
import com.ssafy.donworry.common.response.ApiData;
import com.ssafy.donworry.domain.finance.entity.enums.DutchpayStatus;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/dutchpay")
@RequiredArgsConstructor
public class DutchpayController {

    @Operation(summary = "더치페이 조회", description = "현재 사용자가 요청한 더치페이 항목을 조회할 수 있는 API입니다.")
    @GetMapping("/{id}")
    public ApiData<List<DutchpayPersonResponse>> searchDutchpayPerson(@PathVariable("id") Long memberId) {
        log.info("searchDutchpayPerson : " + memberId);
        List<DutchpayPersonResponse> dutchpayPersonResponseList = new ArrayList<>();
        dutchpayPersonResponseList.add(new DutchpayPersonResponse(memberId, "김동현", DutchpayStatus.COMPLETE, 3l, 10l));

        return ApiData.of(dutchpayPersonResponseList);
    }

    @Operation(summary = "더치페이 요청", description = "해당 거래내역에서 더치페이를 요청할 수 있는 API입니다.")
    @PostMapping("/create")
    public ApiData<List<DutchpayPersonResponse>> createDutchpay(@RequestBody DutchpayCreateRequest dutchpayCreateRequest) {
        log.info("createDutchpay : " + dutchpayCreateRequest.id());
        log.info("createDutchpay : " + dutchpayCreateRequest.reqAmountList().get(0).memberId());

        List<DutchpayPersonResponse> dutchpayPersonResponseList = new ArrayList<>();
        dutchpayPersonResponseList.add(new DutchpayPersonResponse(1l, "김동현", DutchpayStatus.COMPLETE, 3l, 10l));

        return ApiData.of(dutchpayPersonResponseList);
    }

    @Operation(summary = "더치페이 완료", description = "더치페이에서 한 멤버의 상태를 완료할 수 있는 API입니다.")
    @PutMapping("/complete/{id}")
    public ApiData<Long> completePersonDutchpay(@PathVariable("id") Long dutchpayId,
                                          @RequestParam Long memberId){
        log.info("completeDutchpay1 : " + memberId);
        return null;
    }
    // TODO: 2023-09-13 네이밍 중복 안되게 변경하기 

    @Operation(summary = "더치페이 전체 완료", description = "해당 더치페이를 완료할 수 있는 API입니다.")
    @PostMapping("/complete/{id}")
    public ApiData<Long> completeDutchpay(@PathVariable("id") Long dutchpayId) {
        log.info("completeDutchpay2 : " + dutchpayId);
        return null;
    }

}
