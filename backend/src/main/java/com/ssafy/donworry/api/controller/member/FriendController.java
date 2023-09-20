package com.ssafy.donworry.api.controller.member;

import com.ssafy.donworry.api.controller.member.dto.request.FriendRequesRequest;
import com.ssafy.donworry.api.controller.member.dto.response.FriendRequestListResponse;
import com.ssafy.donworry.api.service.member.FriendService;
import com.ssafy.donworry.api.service.member.query.FriendQueryService;
import com.ssafy.donworry.api.service.member.request.FriendRequestServiceRequest;
import com.ssafy.donworry.common.model.UserDetailsModel;
import com.ssafy.donworry.common.response.ApiData;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/friends")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;
    private final FriendQueryService friendQueryService;

    @GetMapping("/request/list")
    @Operation(summary = "친구 요청 리스트", description = "보낸 친구요청, 받은 친구 요청 목록을 보여주는 API 입니다ㅏ.")
    public ApiData<FriendRequestListResponse> requestFriendList(@AuthenticationPrincipal UserDetailsModel model){
        return ApiData.of(friendQueryService.requestFriendList(model.getId()));
    }

    @PostMapping("/request")
    @Operation(summary = "친구 요청", description = "친구 요청을 보내는 API 입니다.")
    public ApiData<String> requestFriend(@RequestBody FriendRequesRequest request, @AuthenticationPrincipal UserDetailsModel model){
        friendService.requestFriend(FriendRequestServiceRequest.of(request), model.getId());
        return ApiData.of("친구 요청에 성공하였습니다.");
    }

//    @PostMapping("/check")
//    @Operation(summary = "친구 수락 or 거절", description = "친구 수락 혹은 거절요청을 보내는 API 입니다.")
//    public ApiData<String> checkFriend(@RequestBody FriendCheckRequest request, @AuthenticationPrincipal UserDetailsModel model){
//
//    }

}
