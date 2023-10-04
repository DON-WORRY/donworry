package com.ssafy.donworry.domain.account.entity;

import com.ssafy.donworry.domain.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Bank extends BaseEntity {

    @Id
    @Column(name = "bank_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 30)
    private String name;

    @NotNull
    @Size(max = 10)
    private String bankCode;

    @Builder
    public Bank(Long id, @NotNull String name, @NotNull String bankCode) {
        this.id = id;
        this.name = name;
        this.bankCode = bankCode;
    }
}
