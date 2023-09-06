package com.ssafy.donworry.domain.account.entity;

import com.ssafy.donworry.domain.BaseEntity;
import com.ssafy.donworry.domain.account.entity.enums.Company;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class CardCompany extends BaseEntity {

    @Id
    @Column(name = "card_company_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    private String company;

    @Builder
    public CardCompany(Long id, @NotNull String company) {
        this.id = id;
        this.company = company;
    }
}
