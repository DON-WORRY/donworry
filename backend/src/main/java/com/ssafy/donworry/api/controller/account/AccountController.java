package com.ssafy.donworry.api.controller.account;

import com.ssafy.donworry.api.controller.account.dto.response.AccountAllResponse;
import com.ssafy.donworry.api.controller.account.dto.response.AccountHistoryResponse;
import com.ssafy.donworry.api.controller.account.dto.response.StatisticsResponse;
import com.ssafy.donworry.api.controller.account.dto.response.UserRankResponse;
import com.ssafy.donworry.api.service.account.AccountService;
import com.ssafy.donworry.api.service.account.query.AccountQueryService;
import com.ssafy.donworry.api.service.member.MemberService;
import com.ssafy.donworry.common.model.UserDetailsModel;
import com.ssafy.donworry.common.response.ApiData;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@Slf4j
@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final AccountQueryService accountQueryService;
    private final MemberService memberService;


    @Operation(summary = "사용자 계좌 불러오기", description = "사용자의 계좌리스트를 불러오는 API입니다.")
    @GetMapping("/list")
    public ApiData<AccountAllResponse> searchAccountList(@AuthenticationPrincipal UserDetailsModel userDetailsModel) {
        Long memberId = userDetailsModel.getId();
        log.info("searchAccountList - memberId : " + memberId);
        AccountAllResponse list = accountQueryService.searchAccountList(memberId);
        return ApiData.of(list);
    }

    @Operation(summary = "계좌 거래내역", description = "선택한 계좌의 거래내역을 불러오는 API입니다.")
    @GetMapping("/{account_id}")
    public ApiData<AccountHistoryResponse> searchAccount(@PathVariable("account_id") Long accountId) {
        log.info("searchAccount - memberId : "+ accountId);
        AccountHistoryResponse list = accountQueryService.searchAccountDetailList(accountId);

        return ApiData.of(list);
    }

    @Operation(summary = "월별 순자산", description = "사용자의 월별 순자산 변동사항 내역")
    @GetMapping("/statistics")
    public ApiData<List<StatisticsResponse>> searchStatistics(@AuthenticationPrincipal UserDetailsModel userDetailsModel) {
        Long memberId = userDetailsModel.getId();
        log.info("searchStatistics - memberID : " + memberId);
        List<StatisticsResponse> list = accountQueryService.searchStatisticsResponseList(memberId);
        AccountAllResponse accountInfo = accountQueryService.searchAccountList(memberId);
        StatisticsResponse lastrs = new StatisticsResponse(list.get(list.size()-1).accountId(), list.get(list.size()-1).time(),accountInfo.total());
        list.set(list.size()-1, lastrs);
        return ApiData.of(list);
    }

    @Operation(summary = "사용자의 자산 순위", description = "사용자의 자산 순위 상위 퍼센트")
    @GetMapping("/rank")
    public ApiData<UserRankResponse> searchRank(@AuthenticationPrincipal UserDetailsModel userDetailsModel) {
        Long memberId = userDetailsModel.getId();
        UserRankResponse userRankResponse = accountQueryService.findTotalAmountByUserId(memberId);

        return ApiData.of(userRankResponse);
    }



    @Operation(summary = "테스트", description = "사용자 계정 생성 시 테스트 진행")
    @GetMapping("/test")
    public ApiData<String> test() {
        log.info("test 입력");
        Long memberId = 1L;
        accountService.createMemberInitAccount(memberId);
        return ApiData.of("성공!");
    }



}
