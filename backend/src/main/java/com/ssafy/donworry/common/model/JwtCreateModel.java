package com.ssafy.donworry.common.model;


import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.entity.enums.MemberGender;
import com.ssafy.donworry.domain.member.entity.enums.MemberRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class JwtCreateModel {

    Long id;
    String name;
    String email;
    LocalDate birthDate;
    MemberGender memberGender;
    MemberRole memberRole;

    @Builder
    public JwtCreateModel(Long id, String name, String email, LocalDate birthDate, MemberGender memberGender, MemberRole memberRole) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.birthDate = birthDate;
        this.memberGender = memberGender;
        this.memberRole = memberRole;
    }

    public static JwtCreateModel of(Member member){
        return JwtCreateModel.builder()
                .id(member.getId())
                .name(member.getMemberName())
                .email(member.getMemberEmail())
                .birthDate(member.getMemberBirthDate())
                .memberGender(member.getMemberGender())
                .memberRole(member.getMemberRole())
                .build();
    }
}
