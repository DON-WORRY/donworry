package com.ssafy.donworry.domain;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Embeddable
@Getter
@NoArgsConstructor(access = PROTECTED)
public class UploadFile {

    @NotNull
    private String uploadFileName;

    @NotNull
    private String storeFileName;

    @Builder
    public UploadFile(String uploadFileName, String storeFileName) {
        this.uploadFileName = uploadFileName;
        this.storeFileName = storeFileName;
    }
}
