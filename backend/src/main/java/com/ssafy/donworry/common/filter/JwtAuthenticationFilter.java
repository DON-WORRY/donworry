package com.ssafy.donworry.common.filter;//package com.shinhan.shbhack.ijoa.common.filter;

import com.ssafy.donworry.api.service.member.query.MemberQueryService;
import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.common.model.UserDetailsModel;
import com.ssafy.donworry.common.util.JwtUtil;
import com.ssafy.donworry.common.util.RedisUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final MemberQueryService memberQueryService;
    private final RedisUtil redisUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.debug("token : '{}'", token);

        if (token == null || !(token.startsWith("Bearer ") || token.startsWith("Refresh "))) {
            log.error("authentication is null");
            filterChain.doFilter(request, response);
            return;
        }

        if (token.startsWith("Bearer ")) {

            token = token.substring(7);

            if (jwtUtil.isTokenExpired(token)) {
                log.error("access token is expired");
                filterChain.doFilter(request, response);
                return;
            }

            Long requestId = jwtUtil.getId(token);

            if(redisUtil.getBlackList(requestId).isPresent()){
                filterChain.doFilter(request, response);
                return;
            }

            userAuthorization(request, requestId);

        } else if(token.startsWith("Refresh ")){
            token = token.substring(8);

            String refreshToken = redisUtil.getToken(jwtUtil.getId(token)).orElseThrow(
                    () -> new InvalidValueException(ErrorCode.TOKEN_NOT_FOUND)
            );

            if(!token.equals(refreshToken)) throw new InvalidValueException(ErrorCode.INVALID_TOKEN);

            String accessToken = jwtUtil.generateAccessToken(jwtUtil.extractAllClaims(refreshToken), (long) (1000 * 60 * 60));
            response.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
//            throw new InvalidValueException(ErrorCode.INVALID_TOKEN);

            userAuthorization(request, jwtUtil.getId(token));
        }

        filterChain.doFilter(request, response);
    }

    private void userAuthorization(HttpServletRequest request, Long id){

        UserDetailsModel userDetailsModel = memberQueryService.loadUserById(id);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetailsModel, null, userDetailsModel.getAuthorities()
        );

        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }


}

