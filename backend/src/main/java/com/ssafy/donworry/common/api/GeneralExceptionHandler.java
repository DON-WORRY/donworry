package com.ssafy.donworry.common.api;

import com.ssafy.donworry.common.error.AlreadyExistException;
import com.ssafy.donworry.common.error.NotFoundException;
import com.ssafy.donworry.common.error.ServiceRuntimeException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static com.ssafy.donworry.common.api.ApiResult.ERROR;

@RestControllerAdvice
@Slf4j
public class GeneralExceptionHandler {
    private ResponseEntity<ApiResult<?>> newResponse(Throwable throwable, HttpStatus status) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return new ResponseEntity<>(ERROR(throwable, status), headers, status);
    }

    @ExceptionHandler(ServiceRuntimeException.class)
    public ResponseEntity<?> handleServiceRuntimeException(ServiceRuntimeException e) {
        if(e instanceof NotFoundException)
            return newResponse(e, HttpStatus.NOT_FOUND);
        if(e instanceof AlreadyExistException)
            return newResponse(e, HttpStatus.BAD_REQUEST);
        log.info("Unexpected service exception occurred : {}", e.getMessage(), e);
        return newResponse(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
