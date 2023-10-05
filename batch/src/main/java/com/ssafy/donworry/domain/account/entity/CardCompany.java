package com.ssafy.donworry.domain.account.entity;

import com.ssafy.donworry.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class CardCompany extends BaseEntity {

    @Id
    @Column(name = "card_company_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 30)
    private String cardCompanyName;

    @NotNull
    @Size(max = 10)
    private String cardCompanyCode;


    @Builder

    public CardCompany(Long id, @NotNull String cardCompanyName, @NotNull String cardCompanyCode) {
        this.id = id;
        this.cardCompanyName = cardCompanyName;
        this.cardCompanyCode = cardCompanyCode;
    }
}
