package com.ssafy.donworry.api.controller.member.dto.request;

import com.ssafy.donworry.domain.member.entity.enums.MemberGender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.aspectj.weaver.ast.Not;

import java.time.LocalDate;

public record MemberJoinRequest(

        @Size(max = 20)
        @NotNull
        String memberName,

        @Size(max = 40)
        @Email
        @NotNull
        String memberEmail,

        @Size(max = 11)
        @NotNull
        @Pattern(regexp = "^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%#*?&])[A-Za-z\\d@$!%*#?&]+$",
                message = "비밀번호는 영문 소문자, 숫자, 특수문자(@$#!%*?&)를 포함해야 합니다.")
        String memberPassword,

        @NotNull
        String memberSimplePassword,

        @NotNull
        MemberGender memberGender,

        @NotNull
        LocalDate memberBirthDate

) {

}
