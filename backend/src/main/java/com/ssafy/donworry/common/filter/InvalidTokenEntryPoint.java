package com.ssafy.donworry.common.filter;


import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.common.response.ApiError;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;


import java.io.IOException;

public class InvalidTokenEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        throw new InvalidValueException(ErrorCode.ATUTHENTIFICATION_ERROR);
    }
}
