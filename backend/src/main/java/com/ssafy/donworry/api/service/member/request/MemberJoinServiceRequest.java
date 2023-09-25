package com.ssafy.donworry.api.service.member.request;

import com.ssafy.donworry.api.controller.member.dto.request.MemberJoinRequest;
import com.ssafy.donworry.domain.member.entity.enums.MemberActivateStatus;
import com.ssafy.donworry.domain.member.entity.enums.MemberGender;
import com.ssafy.donworry.domain.member.entity.enums.MemberRole;
import com.ssafy.donworry.domain.member.entity.enums.OauthProvider;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;

public record MemberJoinServiceRequest(

        String memberName,

        String memberEmail,

        String memberPassword,

        String memberSimplePassword,

        MemberGender memberGender,

        LocalDate memberBirthDate,

        OauthProvider memberOauthProvider,

        MemberRole memberRole,

        MemberActivateStatus memberActivateStatus

) {
    public static MemberJoinServiceRequest of(MemberJoinRequest request, String memberPassword, String memberSimplePassword){
        return new MemberJoinServiceRequest(
                request.memberName(),
                request.memberEmail(),
                memberPassword,
                memberSimplePassword,
                request.memberGender(),
                request.memberBirthDate(),
                request.memberOauthProvider(),
                MemberRole.USER,
                MemberActivateStatus.ACTIVATE
        );
    }
}
