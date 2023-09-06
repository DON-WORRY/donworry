package com.ssafy.donworry.common.api;

import org.springframework.http.HttpStatus;

public class ApiError {
    private final String message;
    private final int status;

    public ApiError(String message, int status) {
        this.message = message;
        this.status = status;
    }

    public ApiError(String message, HttpStatus status) {
        this(message, status.value());
    }

    public ApiError(Throwable throwable, HttpStatus status){
        this(throwable.getMessage(), status);
    }

    public String getMessage(){
        return message;
    }

    public int getStatus(){
        return status;
    }


    @Override
    public String toString() {
        return "ApiError{" +
                "message='" + message + '\'' +
                ", status=" + status +
                '}';
    }
}
