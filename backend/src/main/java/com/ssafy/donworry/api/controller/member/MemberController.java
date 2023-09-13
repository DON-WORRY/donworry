package com.ssafy.donworry.api.controller.member;

import com.ssafy.donworry.api.controller.member.dto.request.MemberJoinRequest;
import com.ssafy.donworry.api.controller.member.dto.request.MemberLoginRequest;
import com.ssafy.donworry.api.service.member.MemberService;
import com.ssafy.donworry.api.service.member.query.MemberQueryService;
import com.ssafy.donworry.api.service.member.request.MemberJoinServiceRequest;
import com.ssafy.donworry.api.service.member.request.MemberLoginServiceRequest;
import com.ssafy.donworry.common.response.ApiData;
import com.ssafy.donworry.domain.member.repository.query.MemberQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final BCryptPasswordEncoder encoder;
    private final MemberQueryService memberQueryService;

    @PostMapping("/join")
    public ApiData<String> joinMember(@RequestBody MemberJoinRequest request){
        memberService.joinMember(MemberJoinServiceRequest.of(request, encoder.encode(request.memberPassword())));

        return ApiData.of("회원가입에 성공했습니다.");
    }

    @PostMapping("/login")
    public ApiData<> loginMember(@RequestBody MemberLoginRequest request){
        memberQueryService.loginMember(MemberLoginServiceRequest.of(request));
    }
}
