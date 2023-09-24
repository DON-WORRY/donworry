package com.ssafy.donworry.common.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class KakaoInfoModel {

    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;

    @Getter
    @ToString
    static class KakaoAccount {
        private KakaoProfile profile;
        private String email;
        private String gender;
        private String age_range;
        private String birthday;
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
        return kakaoAccount.gender;
    }

    public String getAge_Range() {
        return kakaoAccount.age_range;
    }

    public String getBirthday() {
        return kakaoAccount.birthday;
    }

    public String getProfile_Image(){return kakaoAccount.profile.profile_image;}


}
