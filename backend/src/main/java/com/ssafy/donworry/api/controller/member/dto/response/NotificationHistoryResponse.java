package com.ssafy.donworry.api.controller.member.dto.response;

import com.ssafy.donworry.domain.member.entity.Notification;
import com.ssafy.donworry.domain.member.entity.enums.NotificationStatus;
import com.ssafy.donworry.domain.member.entity.enums.NotificationType;

public record NotificationHistoryResponse(
        Long notificationId,
        String notificationContent,
        NotificationType notificationType,
        NotificationStatus notificationStatus
) {
}
