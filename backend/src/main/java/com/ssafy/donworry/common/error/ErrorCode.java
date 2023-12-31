package com.ssafy.donworry.common.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // Common
    INVALID_INPUT_VALUE(400, "C001", "올바르지 않은 입력 입니다."),
    ENTITY_NOT_FOUND(400, "C002", "해당 엔티티를 찾지 못했습니다."),
    INTERNAL_SERVER_ERROR(500, "C003", "서버에 접근이 불가능합니다."),
    HANDLE_ACCESS_DENIED(403, "C004", "접근이 거부되었습니다."),
    ATUTHENTIFICATION_ERROR(401, "C005", "권한이 없습니다." ),
    ABCDEF_ERROR(405, "AB001", "에러 찾는중입니다"),
    
    // Member
    MEMBER_NOT_FOUND(400, "M001", "회원을 찾지 못했습니다."),
    MEMBER_DUPLICATE(400, "M002", "중복된 회원입니다."),
    MEMBER_SAVE_ERROR(400, "M003", "회원등록에 실패하였습니다."),
    PASSWORD_NOT_MATCH(400, "M004", "비밀번호가 일치하지 않습니다."),
    SIMPLE_PASSWORD_NOT_MATCH(400, "M005", "간편 비밀번호가 일치하지 않습니다."),

    // Friend
    FRIEND_REQUEST_SAVE_ERROR(400, "F001", "친구 요청 저장에 실패했습니다."),
    FRIEND_REQUEST_NOT_FOUND(400, "F002", "친구 요청을 찾는데 실패했습니다."),
    ALREADY_FRIEND_RELATIONSHIP(400, "F003", "이미 친구 관계입니다."),
    ALREADY_FRIEND_REQUEST(400, "F004", "이미 친구 요청을 보냈습니다."),

    // Goal
    GOAL_SAVE_ERROR(400, "G001", "목표 등록에 실패하였습니다."),

    // Email
    RANDOM_CODE_ERROR(400, "E001", "이메일 인증 코드 만들기에 실패했습니다."),
    EMAIL_FORM_ERROR(400, "E002", "이메일 양식 만들기에 실패하였습니다."),
    EMAIL_NOT_FOUND(400, "E003", "이메일을 찾지 못했습니다."),
    AUTH_CODE_ERROR(400, "E004", "인증번호가 일치하지 않습니다"),

    // Token
    INVALID_TOKEN(401, "T001", "올바르지 않은 토큰입니다!"),
    TOKEN_NOT_FOUND(400, "T002", "일치하는 토큰을 찾지 못했습니다!"),

    // Oauth
    ACCESS_TOKEN_NOT_FOUND(400, "O001", "어세스 토큰을 가져오는데 실패했습니다."),
    USER_INFO_ACCESS_ERROR(400, "O002", "사용자 정보를 불러오는데 실패했습니다."),

    // Mission
    MISSION_NOT_FOUND(400, "MI001", "존재하지 않는 미션입니다!"),

    // File
    INVALID_FILE(400, "F001", "업로드 할 수 없는 파일입니다."),

    // Redis
    REDIS_CONN_ERROR(400, "R001", "레디스 연결에 실패하였습니다."),

    // Consumption
    CONSUMPTION_NOT_FOUND(400, "CS001", "존재하지 않는 소비입니다!"),

    // ConsumptionCategory
    CONSUMPTION_CATEGORY_NOT_FOUND(400, "CC001", "존재하지 않는 소비카테고리입니다!"),

    // Dutchpay
    DUTCHPAY_SAVE_ERROR(400, "D001", "더치페이 생성에 실패하였습니다."),
    DUTCHPAY_DUPLICATE(400, "D002", "더치페이를 요청한 이력이 있습니다."),

    // DetailDutchpay
    DETAIL_DUTCHPAY_NOT_FOUND(400, "DD001", "존재하지 않는 세부 더치페이입니다!"),
    DETAIL_DUTCHPAY_SAVE_ERROR(400, "DD002", "세부 더치페이 생성에 실패하였습니다."),
    DETAIL_DUTCHPAY_MEMBER_NOT_MATCH(400, "DD003", "세부 더치페이 회원과 로그인 한 회원이 일치하지 않습니다."),

    // Transfer
    ACCOUNT_NO_MONEY(400, "TF001", "계좌의 잔액이 부족합니다."),

    // Account
    ACCOUNT_NOT_FOUND(400, "A001", "존재하지 않는 계좌입니다!"),
    ACCOUNT_CREATE_ERROR(400, "A002", "계좌 생성에 실패했습니다."),

    // Notification
    NOTIFICATION_NOT_FOUND(400, "N001", "알림내역을 찾지 못했습니다."),
    ;

    private final int status;
    private final String code;
    private final String message;


}
