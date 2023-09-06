package com.ssafy.donworry.common.api;

import org.springframework.http.HttpStatus;

public class ApiResult<T>{
    private final boolean success;
    private final T response;
    private final ApiError error;

    public ApiResult(boolean success, T response, ApiError error) {
        this.success = success;
        this.response = response;
        this.error = error;
    }

    public static <T> ApiResult<T> OK(T response) {
        return new ApiResult<>(true, response, null);
    }

    public static ApiResult<?> ERROR(Throwable throwable, HttpStatus status) {
        return new ApiResult<>(false, null, new ApiError(throwable, status));
    }

    public static ApiResult<?> ERROR(String errorMessage, HttpStatus status){
        return new ApiResult<>(false, null, new ApiError(errorMessage, status));
    }

    public boolean isSuccess() {
        return success;
    }

    public ApiError getError(){
        return error;
    }

    public T getResponse() {
        return response;
    }

    @Override
    public String toString() {
        return "ApiResult{" +
                "success=" + success +
                ", response=" + response +
                ", error=" + error +
                '}';
    }
}
