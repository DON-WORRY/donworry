package com.ssafy.donworry.domain.account.entity;

import com.ssafy.donworry.domain.BaseEntity;
import com.ssafy.donworry.domain.account.entity.enums.CardStatus;
import com.ssafy.donworry.domain.account.entity.enums.CardType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.*;
import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.*;

@Entity
@Getter
@NoArgsConstructor
public class Card extends BaseEntity {

    @Id
    @Column(name = "card_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "card_company_id")
    private CardCompany cardCompany;

    @NotNull
    @Size(max = 30)
    private String number;

    @NotNull
    @Enumerated(STRING)
    private CardType cardType;

    @NotNull
    @Enumerated(STRING)
    private CardStatus cardStatus;

    @Builder
    public Card(Long id, @NotNull Account account, @NotNull CardCompany cardCompany, @NotNull String number, @NotNull CardType cardType, @NotNull CardStatus cardStatus) {
        this.id = id;
        this.account = account;
        this.cardCompany = cardCompany;
        this.number = number;
        this.cardType = cardType;
        this.cardStatus = cardStatus;
    }
}
