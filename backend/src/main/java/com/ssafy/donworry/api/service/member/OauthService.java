package com.ssafy.donworry.api.service.member;

import com.ssafy.donworry.api.controller.member.dto.response.MemberLoginResponse;
import com.ssafy.donworry.api.service.member.query.MemberQueryService;
import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.EntityNotFoundException;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.common.model.JwtCreateModel;
import com.ssafy.donworry.common.model.KakaoInfoModel;
import com.ssafy.donworry.common.model.UserDetailsModel;
import com.ssafy.donworry.common.util.JwtUtil;
import com.ssafy.donworry.common.util.OauthKakaoUtil;
import com.ssafy.donworry.common.util.RedisUtil;
import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.entity.enums.OauthProvider;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
import com.ssafy.donworry.domain.member.repository.query.MemberQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class OauthService {

    private final JwtUtil jwtUtil;
    private final RedisUtil redisUtil;
    private final OauthKakaoUtil kakaoUtil;
    private final MemberRepository memberRepository;
    private final MemberQueryRepository memberQueryRepository;

    public Object loginKakao(String kakaoAuthToken){
        String accessToken = kakaoUtil.requestAccessToken(kakaoAuthToken);
        log.debug("kakaoAccessToken: {}", accessToken);

        KakaoInfoModel model = kakaoUtil.requestKakaoInfo(accessToken);
        log.debug("kakaoInfo: {}", model.toString());

        Optional<Member> member = memberRepository.findByMemberEmail(model.getEmail());

        if(member.isPresent()){
            Member m = member.get();
            if(m.getMemberOauthProvider() == OauthProvider.NONE)
                return "로그인 폼을 통해 로그인해주세요";
            else{
                MemberLoginResponse response = jwtUtil.generateAllToken(JwtCreateModel.of(m));

                try{
                    redisUtil.setToken(response.memberId(), response.refreshToken());
                    redisUtil.setUser(loadUserById(response.memberId()));
                    redisUtil.deleteBlackList(response.memberId());
                } catch (Exception e){
                    throw new InvalidValueException(ErrorCode.REDIS_CONN_ERROR);
                }

                return response;
            }
        }
        else{
            //회원가입 진행
            return null;
        }
    }

    // TODO: 2023-09-25 리팩토링 필요 
    public UserDetailsModel loadUserById(Long id){
        return redisUtil.getUser(id).orElseGet(
                () -> memberQueryRepository.findUserDetailsById(id).orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_FOUND))
        );
    }

    // TODO: 2023-09-25 리팩토링 필요
    public void unlinkKakao(String kakaoAccessToken){
        String reqURL = "https://kapi.kakao.com/v1/user/unlink";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", "Bearer " + kakaoAccessToken);

            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String result = "";
            String line = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println(result);
        } catch (IOException e) {
            throw new InvalidValueException(ErrorCode.USER_INFO_ACCESS_ERROR);
        }
    }

}
