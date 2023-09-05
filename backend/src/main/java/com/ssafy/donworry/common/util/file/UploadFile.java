package com.ssafy.donworry.common.util.file;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.*;

@Getter
@Embeddable
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
