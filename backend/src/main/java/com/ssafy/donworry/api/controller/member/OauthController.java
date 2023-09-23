package com.ssafy.donworry.api.controller.member;


import com.ssafy.donworry.api.controller.member.dto.response.MemberLoginResponse;
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

//    @PostMapping("/kakao")
//    public ApiData<MemberLoginResponse> loginKakao(@RequestBody ){
//
//    }

}
