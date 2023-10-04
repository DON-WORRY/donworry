package com.ssafy.donworry.domain.account.repository;

import com.ssafy.donworry.domain.account.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long>{

    boolean existsByCardNumber(String string);


    boolean existsByAccountIdAndCardCompanyId(Long accountId, Long randomCardCompanyId);
}
