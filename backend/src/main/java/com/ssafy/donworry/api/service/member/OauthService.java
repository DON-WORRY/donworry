package com.ssafy.donworry.api.service.member;

import com.ssafy.donworry.api.controller.member.dto.response.MemberLoginResponse;
import com.ssafy.donworry.common.util.OauthKakaoUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class OauthService {

    private final OauthKakaoUtil kakaoUtil;

//    public MemberLoginResponse loginKakao(String kakaoAuthToken){
//        log.debug("kakaoAuthToken: {}", kakaoAuthToken);
//
//        return kakaoUtil.requestAccessToken(kakaoAuthToken);
//    }

    public String loginKakao(String kakaoAuthToken){
        log.debug("kakaoAuthToken: {}", kakaoAuthToken);

        return kakaoUtil.requestAccessToken(kakaoAuthToken);
    }

}
