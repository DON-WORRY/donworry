package com.ssafy.donworry.common.response;


import com.ssafy.donworry.common.error.ErrorCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ApiError extends ApiResult {

    private final String message;

    private ApiError(int status, String code, String message){
        super(status, code);
        this.message = message;
    }

    public static ApiError of(ErrorCode errorCode){
        return new ApiError(errorCode.getStatus(), errorCode.getCode(), errorCode.getMessage());
    }
}
