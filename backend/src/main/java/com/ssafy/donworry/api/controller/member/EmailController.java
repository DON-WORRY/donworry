package com.ssafy.donworry.api.controller.member;

import com.ssafy.donworry.api.controller.member.dto.request.EmailCheckAuthCodeRequest;
import com.ssafy.donworry.api.service.member.query.EmailQueryService;
import com.ssafy.donworry.api.service.member.request.EmailCheckAuthCodeServiceRequest;
import com.ssafy.donworry.common.response.ApiData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/emails")
@RequiredArgsConstructor
public class EmailController {

    private final EmailQueryService emailQueryService;

    @PostMapping("/join")
    public ApiData<String> joinEmail(@RequestParam("email") String email){
        emailQueryService.joinEmail(email);
        return ApiData.of("인증 메일을 확인해주세요.");
    }

    @PostMapping("/check")
    public ApiData<String> checkEmailAuthCode(@RequestBody EmailCheckAuthCodeRequest request){
        emailQueryService.checkEmailAuthCode(EmailCheckAuthCodeServiceRequest.of(request));
        return ApiData.of("인증 확인 되었습니다");
    }
}
