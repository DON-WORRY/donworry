package com.ssafy.donworry.api.controller.member;

import com.ssafy.donworry.api.service.member.NotificationService;
import com.ssafy.donworry.common.model.UserDetailsModel;
import com.ssafy.donworry.common.util.SseUtil;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final SseUtil sseUtil;
    @Operation(summary = "sse 구독 요청", description = "sse를 구독 요청하는 API입니다.")
    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    public SseEmitter subscribe(@AuthenticationPrincipal UserDetailsModel userDetailsModel) {
        Long memberId = userDetailsModel.getId();
        return sseUtil.subscribe(memberId);
    }



}
