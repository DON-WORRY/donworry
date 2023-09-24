package com.ssafy.donworry.api.controller.member;


import com.ssafy.donworry.api.controller.member.dto.request.OuathKakaoRequest;
import com.ssafy.donworry.api.controller.member.dto.response.MemberLoginResponse;
import com.ssafy.donworry.api.service.member.OauthService;
import com.ssafy.donworry.common.response.ApiData;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
public class OauthController {

    private final OauthService oauthService;

    @PostMapping("/kakao")
    @Operation(summary = "카카오 로그인", description = "auth_token 받아서 후처리")
    public ApiData<?> loginKakao(@RequestBody OuathKakaoRequest request){
        return ApiData.of(oauthService.loginKakao(request.kakaoAuthToken()));
    }


    // TODO: 2023-09-25 requestbody로 리팩토링
    @GetMapping("/kakao/unlink")
    @Operation(summary = "카카오 연결 끊기", description = "접근 권한 잘못 설정했을때 사용")
    public ApiData<?> unlinkKakao(@RequestParam String kakaoAccessToken){
        log.debug("kakao token: {}", kakaoAccessToken);
        oauthService.unlinkKakao(kakaoAccessToken);
        return null;
    }

}
