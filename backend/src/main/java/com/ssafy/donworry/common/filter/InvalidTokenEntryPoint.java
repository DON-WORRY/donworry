package com.ssafy.donworry.common.filter;


import com.ssafy.donworry.common.error.ErrorCode;
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
        response.setContentType("application/json");
        response.setStatus(401);
        response.getWriter().write(ApiError.of(ErrorCode.INVALID_TOKEN).toString());
    }
}
