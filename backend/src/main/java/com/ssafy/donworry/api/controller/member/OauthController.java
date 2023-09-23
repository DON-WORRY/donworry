package com.ssafy.donworry.api.controller.member;


import com.ssafy.donworry.api.controller.member.dto.request.OuathKakaoRequest;
import com.ssafy.donworry.api.controller.member.dto.response.MemberLoginResponse;
import com.ssafy.donworry.api.service.member.OauthService;
import com.ssafy.donworry.common.response.ApiData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
public class OauthController {

    private final OauthService oauthService;

//    @PostMapping("/kakao")
//    public ApiData<MemberLoginResponse> loginKakao(@RequestBody OuathKakaoRequest request){
//        return ApiData.of(oauthService.loginKakao(request.kakaoAuthToken()));
//    }

    @PostMapping("/kakao")
    public ApiData<String> loginKakao(@RequestBody OuathKakaoRequest request){
        return ApiData.of(oauthService.loginKakao(request.kakaoAuthToken()));
    }

}
