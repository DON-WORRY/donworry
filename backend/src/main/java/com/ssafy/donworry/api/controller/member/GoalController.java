package com.ssafy.donworry.api.controller.member;

import com.ssafy.donworry.api.controller.member.dto.request.GoalCreateRequest;
import com.ssafy.donworry.api.controller.member.dto.response.GoalDetailResponse;
import com.ssafy.donworry.api.service.member.GoalService;
import com.ssafy.donworry.api.service.member.query.GoalQueryService;
import com.ssafy.donworry.api.service.member.request.GoalCreateServiceRequest;
import com.ssafy.donworry.common.model.UserDetailsModel;
import com.ssafy.donworry.common.response.ApiData;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;
    private final GoalQueryService goalQueryService;

    @PostMapping("/create")
    public ApiData<String> craeteGoal(@RequestBody GoalCreateRequest request, @AuthenticationPrincipal UserDetailsModel model){
        goalService.createGoal(GoalCreateServiceRequest.of(model.getId(), request));
        return ApiData.of("목표 생성에 성공하였습니다.");
    }

    @GetMapping("")
    public ApiData<GoalDetailResponse> searchGoalDetail(@AuthenticationPrincipal UserDetailsModel model){
        return ApiData.of(goalQueryService.searchGoalDetail(model.getId()));
    }


}
