package com.ssafy.donworry.common.model;


import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.domain.member.entity.enums.MemberRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JwtCreateModel {

    Long id;
    String name;
    String email;
    MemberRole memberRole;

    @Builder
    public JwtCreateModel(Long id, String name, String email, MemberRole memberRole) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.memberRole = memberRole;
    }

    public static JwtCreateModel of(Member member){
        return JwtCreateModel.builder()
                .id(member.getId())
                .name(member.getMemberName())
                .email(member.getMemberEmail())
                .memberRole(member.getMemberRole())
                .build();
    }
}
