package com.ssafy.donworry.api.controller.member;

import com.ssafy.donworry.api.controller.member.dto.response.NotificationListResponse;
import com.ssafy.donworry.api.service.member.NotificationService;
import com.ssafy.donworry.api.service.member.query.NotificationQueryService;
import com.ssafy.donworry.common.model.UserDetailsModel;
import com.ssafy.donworry.common.response.ApiData;
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
    private final NotificationQueryService notificationQueryService;
    private final NotificationService notificationService;
    @Operation(summary = "sse 구독 요청", description = "sse를 구독 요청하는 API입니다.")
    @GetMapping(value = "/subscribe/{id}", produces = "text/event-stream")
    public SseEmitter subscribe(@PathVariable("id") Long memberId) {
        return sseUtil.subscribe(memberId);
    }

    @Operation(summary = "알림 내역 조회", description = "읽지 않은 알림을 조회할 수 있는 API입니다.")
    @GetMapping(value = "")
    public ApiData<NotificationListResponse> searchNotification(@AuthenticationPrincipal UserDetailsModel userDetailsModel) {
        Long memberId = userDetailsModel.getId();
        NotificationListResponse list = notificationQueryService.searchNotification(memberId);
        return ApiData.of(list);
    }

    @Operation(summary = "알림 상태 변경", description = "알림을 읽었을 때 상태를 변경할 수 있는 API입니다.")
    @PostMapping(value = "update/{id}")
    public ApiData<Long> updateNotificationStatus(@PathVariable("id") Long notificationId) {
        Long result = notificationService.updateNotificationStatus(notificationId);
        return ApiData.of(result);
    }



}
