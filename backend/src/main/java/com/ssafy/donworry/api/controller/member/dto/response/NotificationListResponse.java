package com.ssafy.donworry.api.controller.member.dto.response;

import java.util.List;

public record NotificationListResponse(
        List<NotificationHistoryResponse> notificationHistoryResponseList
) {
    public static NotificationListResponse of(List<NotificationHistoryResponse> list) {
        return new NotificationListResponse(
                list
        );
    }
}
