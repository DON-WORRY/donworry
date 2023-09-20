package com.ssafy.donworry.common.config;

//import com.ssafy.donworry.common.filter.JwtAuthenticationFilter;

import com.ssafy.donworry.common.filter.InvalidTokenEntryPoint;
import com.ssafy.donworry.common.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CorsFilter corsFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.
                csrf((csrf) -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .formLogin(login -> login.disable())
                .httpBasic(httpBasic -> httpBasic.disable())
                .authorizeRequests(authorize -> authorize
//                        .requestMatchers("/**").permitAll()
                        .requestMatchers("/api/auth/**", "/swagger-ui/**", "/swagger-ui.html/**", "/demo-ui.html/**", "/api-docs/**").permitAll()
                        .requestMatchers("/api/emails/**", "/api/members/join", "/api/members/login").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling.authenticationEntryPoint(new InvalidTokenEntryPoint())
                );
        return http.build();
    }

}
