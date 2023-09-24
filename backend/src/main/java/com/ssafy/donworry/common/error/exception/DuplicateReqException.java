package com.ssafy.donworry.common.error.exception;

import com.ssafy.donworry.common.error.ErrorCode;

public class DuplicateReqException extends ServiceRuntimeException{
    public DuplicateReqException(ErrorCode errorCode) {
        super(errorCode);
    }
}
