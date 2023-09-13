package com.ssafy.donworry.common.error.exception;

import com.ssafy.donworry.common.error.ErrorCode;
import lombok.Getter;

@Getter
public class ServiceRuntimeException extends RuntimeException {

    private ErrorCode errorCode;

    public ServiceRuntimeException(String message, ErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public ServiceRuntimeException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

}
