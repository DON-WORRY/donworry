package com.ssafy.donworry.common.filter;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
public class FileExtensionFilter {

    // TODO: 2023-09-10 리팩토링 필요 
    private final String[] NOT_ALLOWED_IMG_EXTENSIONS = {"png", "jpg", "jpeg", "gif"};
    private final String[] NOT_ALLOWED_FILE_EXTENSIONS = {"jsp", "php", "asp", "html", "perl"};

    public void imageFilter(MultipartFile file) {
        boolean isValid = false;

        String originalFileName = file.getOriginalFilename();
        if (originalFileName != null) {
            String extension = extractExtension(originalFileName.toLowerCase());
            for (String ext : NOT_ALLOWED_IMG_EXTENSIONS) {
                if (ext.equals(extension)) {
                    isValid = true;
                    break;
                }
            }
            if (!isValid) {
                throw new IllegalArgumentException(".png, .jpg, .jpeg, .gif 형식의 이미지 파일만 가능합니다.");
            }
        }
    }

    public void imageListFilter(List<MultipartFile> files) {
        boolean isValid = false;
        for (MultipartFile file : files) {
            String originalFilename = file.getOriginalFilename();
            if (originalFilename != null) {
                String ext = extractExtension(originalFilename).toLowerCase();
                for (String s : NOT_ALLOWED_IMG_EXTENSIONS) {
                    if (s.equals(ext)) {
                        isValid = true;
                        break;
                    }
                }
                if (!isValid) {
                    throw new IllegalArgumentException(".png, .jpg, .jpeg, .gif 형식의 이미지 파일만 가능합니다.");
                }
            }
        }
    }

    public void badFileListFilter(List<MultipartFile> files) {
        boolean isValid = true;
        for (MultipartFile file : files) {
            String originalFilename = file.getOriginalFilename();
            if (originalFilename != null) {
                String ext = extractExtension(originalFilename).toLowerCase();
                for (String s : NOT_ALLOWED_FILE_EXTENSIONS) {
                    if (ext.equals(s)) {
                        isValid = false;
                        break;
                    }
                }
            }
        }
        if (!isValid) {
            throw new IllegalArgumentException("불가능한 형식의 파일이 존재합니다.");
        }
    }

    private static String extractExtension(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos+1);
    }
}
