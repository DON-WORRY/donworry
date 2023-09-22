package com.ssafy.donworry.domain.finance.repository;

import com.ssafy.donworry.domain.finance.entity.Dutchpay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DutchpayRepository extends JpaRepository<Dutchpay, Long> {

    List<Dutchpay> findAllByMemberId(Long memberId);
}
