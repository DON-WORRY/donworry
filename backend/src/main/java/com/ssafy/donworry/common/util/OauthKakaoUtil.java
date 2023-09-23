package com.ssafy.donworry.common.util;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.donworry.api.controller.member.dto.request.OuathKakaoRequest;
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

    private String accessToken;
    @Value("${OAUTH2_KAKAO_REST_API}")
    private String clientId;
    @Value("${OAUTH2_KAKAO_REDIRECT_URL}")
    private String redirectUrl;
    private static final String AUTH_URL = "https://kauth.kakao.com";
    private static final String GRANT_TYPE = "authorization_code";

    private final RestTemplate restTemplate;


    public String requestAccessToken(String kakaoAuthToken) {
        String url = AUTH_URL + "/oauth/token";

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("code", kakaoAuthToken);
        body.add("grant_type", GRANT_TYPE);
        body.add("client_id", clientId);
//        body.add("redirect_uri", "http://localhost:8080/oauth2/redirect");
        body.add("redirect_uri", redirectUrl);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, httpHeaders);

        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, request, String.class);

        String responseBody = responseEntity.getBody();
        if (responseBody != null) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode jsonNode = objectMapper.readTree(responseBody);
                this.accessToken = jsonNode.get("access_token").asText();
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }

        return accessToken;
    }

//    public OAuthInfoResponse requestOauthInfo(String accessToken) {
//        String url = apiUrl + "/v2/user/me";
//
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//        httpHeaders.set("Authorization", "Bearer " + accessToken);
//
//        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
//        body.add("property_keys", "[\"kakao_account.email\", \"kakao_account.age_range\", \"kakao_account.gender\",\"kakao_account.birthday\", \"kakao_account.profile\"]");
//
//        HttpEntity<?> request = new HttpEntity<>(body, httpHeaders);
//
//        return restTemplate.postForObject(url, request, KakaoInfoResponse.class);
//    }
}
