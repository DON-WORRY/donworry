package com.ssafy.donworry.common.error.exception;

import com.ssafy.donworry.common.error.ErrorCode;

public class EntityNotFoundException extends ServiceRuntimeException {

    public EntityNotFoundException(ErrorCode errorCode){
        super(errorCode);
    }

}
