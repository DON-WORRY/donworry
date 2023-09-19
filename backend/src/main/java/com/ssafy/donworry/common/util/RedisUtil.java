package com.ssafy.donworry.common.util;

import com.ssafy.donworry.common.model.UserDetailsModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.util.Optional;

@Slf4j
@Repository
@RequiredArgsConstructor
public class RedisUtil {

    private final RedisTemplate<String, Object> cacheObject;
    private final RedisTemplate<String, UserDetailsModel> cacheUser;

    private final static String EMAIL_AUTH_PREFIX = "EMAIL:";
    private final static String USER_AUTH_PREFIX = "USER:";
    private final static String TOKEN_AUTH_PREFIX = "TOKEN:";
    private final static String LOGOUT_AUTH_PREFIX = "LOGOUT:";
    private final static Duration EMAIL_CACHE_TTL = Duration.ofMinutes(30);
    private final static Duration USER_CACHE_TTL = Duration.ofHours(1);
    private final static Duration TOKEN_CACHE_TTL = Duration.ofDays(7);
    private final static Duration LOGOUT_CACHE_TTL = Duration.ofHours(1);

    // TODO: 2023-09-10 인터페이스 구성이 좀 더 좋아보임
    public void setEmail(String email, String code){
        String key = EMAIL_AUTH_PREFIX + email;
        log.debug("Set Email: {} and Code: {}", key, code);
        cacheObject.opsForValue().set(key, code, EMAIL_CACHE_TTL);
    }

    public Optional<String> getEmail(String email){
        String key = EMAIL_AUTH_PREFIX + email;
        String value = (String)cacheObject.opsForValue().get(key);
        log.debug("Get Email code: {}", value);
        return Optional.ofNullable(value);
    }

    public void deleteEmail(String email){
        String key = EMAIL_AUTH_PREFIX + email;
        log.debug("Delete Email: {}", key);
        cacheObject.delete(key);
    }

    public void setUser(UserDetailsModel model){
        String key = USER_AUTH_PREFIX + model.getId();
        log.debug("Set User email: {}", key);
        cacheUser.opsForValue().set(key, model, USER_CACHE_TTL);
    }

    public Optional<UserDetailsModel> getUser(Long id){
        String key = USER_AUTH_PREFIX + id;
        log.debug("Get User email: {}", key);
        return Optional.ofNullable(cacheUser.opsForValue().get(key));
    }

    public void deleteUser(Long id){
        String key = USER_AUTH_PREFIX + id;
        log.debug("Delete User email: {}", key);
        cacheUser.delete(key);
    }

    public void setToken(Long id, String token){
        String key = TOKEN_AUTH_PREFIX + id;
        log.debug("Set Token: {}, and User id: {}", token, id);
        cacheObject.opsForValue().set(key, token, TOKEN_CACHE_TTL);
    }

    public Optional<String> getToken(Long id){
        String key = TOKEN_AUTH_PREFIX + id;
        log.debug("Get Token: {}", key);
        String value = (String)cacheObject.opsForValue().get(key);
        return Optional.ofNullable(value);
    }

    public void deleteToken(Long id){
        String key = TOKEN_AUTH_PREFIX + id;
        log.debug("Detele Token: {}", key);
        cacheObject.delete(key);
    }

    public void setBlackList(Long id){
        String key = LOGOUT_AUTH_PREFIX + id;
        log.debug("Set Token: {}, and User id: {}", id, id);
        cacheObject.opsForValue().set(key, id, TOKEN_CACHE_TTL);
    }

    public Optional<Long> getBlackList(Long id){
        String key = LOGOUT_AUTH_PREFIX + id;
        log.debug("Get Token: {}", key);
        Long value = (Long)cacheObject.opsForValue().get(key);
        return Optional.ofNullable(value);
    }

    public void deleteBlackList(Long id){
        String key = LOGOUT_AUTH_PREFIX + id;
        log.debug("Detele Token: {}", key);
        cacheObject.delete(key);
    }

}
