package com.ssafy.donworry.common.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // Common
    INVALID_INPUT_VALUE(400, "C001", "올바르지 않은 입력 입니다!"),
    ENTITY_NOT_FOUND(400, "C003", "해당 엔티티를 찾지 못했습니다!"),
    INTERNAL_SERVER_ERROR(500, "C004", "서버에 접근이 불가능합니다!"),
    INVALID_TYPE_VALUE(400, "C005", "값 형식이 올바르지 않습니다!"),
    HANDLE_ACCESS_DENIED(403, "C006", "접근이 거부되었습니다!"),
    
    // Member
    EMAIL_DUPLICATION(400, "M001", "이메일이 중복되었습니다!"),
    LOGIN_INPUT_INVALID(400, "M002", "아이디 비밀번호를 확인해 주세요!"),
    NOTMATCH_MEMBER_EMAIL(400, "M003", "존재하지 않는 회원입니다!"),
    NOTMATCH_MEMBER_PASSWORD(400, "M004", "비밀번호가 일치하지 않습니다!"),
    NOTMATCH_MEMBER_ID(400, "M005", "존재하지 않는 회원입니다!"),

    // Email
    NOTMATCH_EMAIL(400, "E001", "이메일이 일치하지 않습니다!"),
    NOTMATCH_EMAIL_CODE(400, "E002", "인증 코드가 다릅니다!"),

    // Token
    INVALID_TOKEN(401, "T001", "올바르지 않은 토큰입니다!"),
    NOT_FOUND_TOKEN(400, "T002", "일치하는 토큰을 찾지 못했습니다!"),

    // Mission
    NOTMATCH_MISSION_ID(400, "MI001", "존재하지 않는 미션입니다!"),

    // File
    INVALID_FILE(400, "F001", "업로드 할 수 없는 파일입니다!");

    private final int status;
    private final String code;
    private final String message;


}
