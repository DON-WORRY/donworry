package com.ssafy.donworry.api.controller.member;

import com.ssafy.donworry.api.controller.member.dto.request.MemberJoinRequest;
import com.ssafy.donworry.api.controller.member.dto.request.MemberLoginRequest;
import com.ssafy.donworry.api.controller.member.dto.response.MemberLoginResponse;
import com.ssafy.donworry.api.controller.member.dto.response.MemberSearchResponse;
import com.ssafy.donworry.api.service.member.MemberService;
import com.ssafy.donworry.api.service.member.query.MemberQueryService;
import com.ssafy.donworry.api.service.member.request.MemberJoinServiceRequest;
import com.ssafy.donworry.api.service.member.request.MemberLoginServiceRequest;
import com.ssafy.donworry.common.model.UserDetailsModel;
import com.ssafy.donworry.common.response.ApiData;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final BCryptPasswordEncoder encoder;
    private final MemberQueryService memberQueryService;

    @PostMapping("/join")
    @Operation(summary = "회원가입", description = "양식을 입력받아 회원가입을 시켜주는 API 입니다")
    public ApiData<String> joinMember(@RequestBody MemberJoinRequest request){
        memberService.joinMember(MemberJoinServiceRequest.of(request, encoder.encode(request.memberPassword()), encoder.encode(request.memberSimplePassword())));

        return ApiData.of("회원가입에 성공했습니다.");
    }

    @PostMapping("/login")
    @Operation(summary = "로그인", description = "로그인후 token을 발급시켜주는 API 입니다")
    public ApiData<MemberLoginResponse> loginMember(@RequestBody MemberLoginRequest request){
        return ApiData.of(memberQueryService.loginMember(MemberLoginServiceRequest.of(request)));
    }

    @GetMapping("/logout")
    @Operation(summary = "로그아웃", description = "로그아웃 후 관련 캐시데이터를 지워주는 API 입니다")
    public ApiData<String> logoutMember(@AuthenticationPrincipal UserDetailsModel model){
        memberQueryService.logoutMember(model.getId());
        return ApiData.of("로그아웃에 성공하였습니다.");
    }

    @GetMapping("/search")
    @Operation(summary = "이름으로 검색", description = "회원 리스트 이름으로 검색")
    public ApiData<List<MemberSearchResponse>> searchMember(@RequestParam(required = false) String memberName){
        return ApiData.of(memberQueryService.searchMember(memberName));
    }
}
