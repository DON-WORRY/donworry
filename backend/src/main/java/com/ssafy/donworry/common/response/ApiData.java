package com.ssafy.donworry.common.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiData<T> extends ApiResult {

    private final T data;

    private ApiData(T data){
        super(HttpStatus.OK.value(), HttpStatus.OK.name());
        this.data = data;
    }

    public static <T> ApiData<T> of(T data){
        return new ApiData<>(data);
    }
}
