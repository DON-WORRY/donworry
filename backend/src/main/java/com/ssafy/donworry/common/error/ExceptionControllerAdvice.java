package com.ssafy.donworry.common.error;


import com.ssafy.donworry.common.error.exception.ServiceRuntimeException;
import com.ssafy.donworry.common.response.ApiError;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ExceptionControllerAdvice {

    @ExceptionHandler(ServiceRuntimeException.class)
    protected ResponseEntity<ApiError> handleServiceRuntimeException(ServiceRuntimeException e){
        log.error("handleServiceRuntimeException", e);
        final ErrorCode errorCode = e.getErrorCode();
        final ApiError apiError = ApiError.of(errorCode);
        return new ResponseEntity<>(apiError, HttpStatus.valueOf(errorCode.getStatus()));
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ApiError> handleException(Exception e) {
        log.error("Exception", e);
        final ApiError apiError = ApiError.of(ErrorCode.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(apiError, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
