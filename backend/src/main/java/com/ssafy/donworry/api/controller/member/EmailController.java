package com.ssafy.donworry.api.controller.member;

import com.ssafy.donworry.api.controller.member.dto.request.EmailCheckAuthCodeRequest;
import com.ssafy.donworry.api.service.member.query.EmailQueryService;
import com.ssafy.donworry.api.service.member.request.EmailCheckAuthCodeServiceRequest;
import com.ssafy.donworry.common.response.ApiData;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/emails")
@RequiredArgsConstructor
public class EmailController {

    private final EmailQueryService emailQueryService;


    // TODO: 2023-09-20 RequestParam 을 PathVariable로 바꾸기
    @PostMapping("/join")
    @Operation(summary = "인증 메일 보내기", description = "적어진 이메일로 회원 가입 인증 메일을 보내는 API 입니다.")
    public ApiData<String> joinEmail(@RequestParam("email") String email){
        emailQueryService.joinEmail(email);
        return ApiData.of("인증 메일을 확인해주세요.");
    }

    @PostMapping("/check")
    @Operation(summary = "인증 코드 확인", description = "입력받은 인증 코드와 서버의 인증 코드가 일치하는지 확인하는 API 입니다.")
    public ApiData<String> checkEmailAuthCode(@RequestBody EmailCheckAuthCodeRequest request){
        emailQueryService.checkEmailAuthCode(EmailCheckAuthCodeServiceRequest.of(request));
        return ApiData.of("인증 확인 되었습니다");
    }
}
