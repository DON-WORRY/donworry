package com.ssafy.donworry.common.response;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

@Getter
@Slf4j
public class ApiPage<T> extends ApiResult {

    private T data;
    private int pageNumber;
    private int pageSize;
    private int pageTotalCnt;

    private ApiPage(T data, int pageNumber, int pageSize, int pageTotalCnt){
        super(HttpStatus.OK.value(), HttpStatus.OK.name());
        this.data = data;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.pageTotalCnt = pageTotalCnt;
    }

    public static <T> ApiPage<T> of(T data, int pageNumber, int pageSize, int pageTotalCnt){
        return new ApiPage<>(data, pageNumber, pageSize, pageTotalCnt);
    }

}
