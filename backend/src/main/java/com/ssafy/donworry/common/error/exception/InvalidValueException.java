package com.ssafy.donworry.common.error.exception;

import com.ssafy.donworry.common.error.ErrorCode;

public class InvalidValueException extends ServiceRuntimeException {

    public InvalidValueException(ErrorCode errorCode){
        super(errorCode);
    }

}
