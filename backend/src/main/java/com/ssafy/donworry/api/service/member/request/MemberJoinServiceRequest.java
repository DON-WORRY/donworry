package com.ssafy.donworry.api.service.member.request;

import com.ssafy.donworry.api.controller.member.dto.request.MemberJoinRequest;
import com.ssafy.donworry.domain.member.entity.enums.MemberActivateStatus;
import com.ssafy.donworry.domain.member.entity.enums.MemberGender;
import com.ssafy.donworry.domain.member.entity.enums.MemberRole;
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

        MemberGender memberGender,

        LocalDate memberBirthDate,

        MemberRole memberRole,

        MemberActivateStatus memberActivateStatus
) {
    public static MemberJoinServiceRequest of(MemberJoinRequest request, String memberPassword){
        return new MemberJoinServiceRequest(
                request.memberName(),
                request.memberEmail(),
                memberPassword,
                request.memberGender(),
                request.memberBirthDate(),
                MemberRole.USER,
                MemberActivateStatus.ACTIVATE
        );
    }
}
