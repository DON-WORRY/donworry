package com.ssafy.donworry.domain.member.entity.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum NotificationType {
    FRIENDREQ("친구요청"),
    FRIENDREL("친구확인"),
    DUTCHREQ("더치페이 요청"),
    INCOME("입금"),
    CONSUMPTION("출금");

    private final String message;
}
