package com.ssafy.donworry.common.response;


import com.ssafy.donworry.common.error.ErrorCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ApiError extends ApiResult {

    private String message;

    private ApiError(int status, String code, String message){
        super(status, code);
        this.message = message;
    }

    public static ApiError of(ErrorCode errorCode){
        return new ApiError(errorCode.getStatus(), errorCode.getCode(), errorCode.getMessage());
    }

    // TODO: 2023-09-10 authenication 오류시 ToString으로 값이 잘 나오는지 확인 필요
//    public String toStream(){
//        return "{" +
//                "\"status\":" + "\"" + this.getStatus()
//    }
}
