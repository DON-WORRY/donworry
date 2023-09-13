package com.ssafy.donworry.api.controller.account;

import com.ssafy.donworry.api.service.account.AccountService;
import com.ssafy.donworry.api.service.account.request.CreateGoalRequest;
import com.ssafy.donworry.api.controller.account.dto.response.AccountDetailResponse;
import com.ssafy.donworry.api.controller.account.dto.response.ConsumptionResponse;
import com.ssafy.donworry.api.controller.account.dto.response.StatisticsResponse;
import com.ssafy.donworry.api.service.account.query.AccountQueryService;
import com.ssafy.donworry.api.service.member.MemberService;
import com.ssafy.donworry.common.api.ApiResult;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.donworry.common.api.ApiResult.OK;

@Slf4j
@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final AccountQueryService accountQueryService;
    private final MemberService memberService;


    @Operation(summary = "계좌 거래내역", description = "계좌별 거래내역을 불러오는 API입니다.")
    @GetMapping("/account/{id}")
    public ApiResult<List<AccountDetailResponse>> searchAccount(@PathVariable("id") Long memberId) {
        log.info("searchAccount - memberId : "+ memberId);
        return OK(null);
    }

    @Operation(summary = "카드별 소비내역", description = "소지한 카드들의 카드별 소비내역을 조회하는 API입니다.")
    @GetMapping("/card/{id}")
    public ApiResult<List<ConsumptionResponse>> searchCardConsumption(@PathVariable("id") Long memberId) {
        log.info("searchCardConsumption - memberId : " + memberId);
        return OK(null);
    }

    @Operation(summary = "월별 순자산", description = "사용자의 월변 순자산 변동사항 내역")
    @GetMapping("/statistics/{id}")
    public ApiResult<List<StatisticsResponse>> searchStatistics(@PathVariable("id") Long memberId) {
        log.info("searchStatistics - memberID : " + memberId);
        return OK(null);
    }

    @Operation(summary = "금액 목표 설정", description = "사용자의 목표 금액을 설정하는 API입니다.")
    @PostMapping("/goal")
    public ApiResult<Void> createGoal(@RequestBody CreateGoalRequest createGoalRequest) {
        log.info("createGoalRequest :" + createGoalRequest.toString());
        return OK(null);
    }

    @Operation(summary = "테스트", description = "사용자 계정 생성 시 테스트 진행")
    @GetMapping("/test")
    public ApiResult<String> test() {
        log.info("test 입력");
        Long memberId = 1L;
        accountService.createMemberInitAccount(memberId);
        return OK("성공!");
    }


}
