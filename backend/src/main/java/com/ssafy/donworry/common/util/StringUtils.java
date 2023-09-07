package com.ssafy.donworry.common.util;

public class StringUtils {
    public static String customTrim(String input){
        return input.replaceAll("(\r\n|\r|\n|\n\r)", "");
    }
}
