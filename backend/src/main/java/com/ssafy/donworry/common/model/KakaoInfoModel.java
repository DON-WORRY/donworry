package com.ssafy.donworry.common.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.donworry.domain.member.entity.enums.OauthProvider;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true, value = {"kakao_account"}, allowSetters = true)
public class KakaoInfoModel {

    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;

    @Getter
    @ToString
    static class KakaoAccount {
        private KakaoProfile profile;
        private String email;
        private String gender;
    }

    @Getter
    @ToString
    static class KakaoProfile {
        private String nickname;
        private String profile_image;
    }


    public String getEmail() {
        return kakaoAccount.email;
    }

    public String getNickname() {
        return kakaoAccount.profile.nickname;
    }

    public String getGender() {
        return kakaoAccount.gender.toUpperCase();
    }

    @JsonIgnore
    public String getProfile_Image(){return kakaoAccount.profile.profile_image;}

    public OauthProvider getOauthProvider() {return OauthProvider.KAKAO;}
}
