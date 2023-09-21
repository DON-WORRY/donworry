package com.ssafy.donworry.domain.finance.repository;

import com.ssafy.donworry.domain.finance.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Long>{

    List<Income> findByAccountId(Long accountId);
}
