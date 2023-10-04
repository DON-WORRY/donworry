package com.ssafy.donworry.common.util;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.donworry.api.controller.member.dto.request.OuathKakaoRequest;
import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.common.model.KakaoInfoModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Component
@RequiredArgsConstructor
public class OauthKakaoUtil {

    @Value("${social-kakao.OAUTH2_KAKAO_REST_API}")
    private String clientId;
    @Value("${social-kakao.OAUTH2_KAKAO_REDIRECT_URL}")
    private String redirectUrl;
    private static final String ACCESS_URL = "https://kauth.kakao.com";
    private static final String INFO_URL = "https://kapi.kakao.com";
    private static final String GRANT_TYPE = "authorization_code";

    private final RestTemplate restTemplate;


    public String requestAccessToken(String kakaoAuthToken) {
        String url = ACCESS_URL + "/oauth/token";

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("code", kakaoAuthToken);
        body.add("grant_type", GRANT_TYPE);
        body.add("client_id", clientId);
        body.add("redirect_uri", redirectUrl);

        HttpEntity<?> request = new HttpEntity<>(body, httpHeaders);

        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, request, String.class);

        // TODO: 2023-09-25 더 직관적인 코드 생각해보기
        String responseBody = responseEntity.getBody();
        if (responseBody != null) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode jsonNode = objectMapper.readTree(responseBody);
                return jsonNode.get("access_token").asText();
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }

        throw new InvalidValueException(ErrorCode.ACCESS_TOKEN_NOT_FOUND);
    }

    public KakaoInfoModel requestKakaoInfo(String accessToken) {
        String url = INFO_URL + "/v2/user/me";

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        httpHeaders.set("Authorization", "Bearer " + accessToken);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();

        HttpEntity<?> request = new HttpEntity<>(body, httpHeaders);

        return restTemplate.postForObject(url, request, KakaoInfoModel.class);
    }
}
