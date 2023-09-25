package com.ssafy.donworry.common.util;

import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class RandomUtil {

    public String createAuthCode() {
        int length = 6;
        final int leftLimit = 48;
        // 소문자 'z'
        final int rightLimit = 122;

        Random random = new Random();
        try{
            return random.ints(leftLimit, rightLimit + 1)
                    .filter(x -> (x <= 57 || x >= 65) && (x <= 90 || x >= 97))
                    .limit(length)
                    .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                    .toString();
        } catch(InvalidValueException e){
            throw new InvalidValueException(ErrorCode.RANDOM_CODE_ERROR);
        }
    }
}
