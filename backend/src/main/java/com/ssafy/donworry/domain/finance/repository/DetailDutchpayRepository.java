package com.ssafy.donworry.domain.finance.repository;

import com.ssafy.donworry.domain.finance.entity.DetailDutchpay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetailDutchpayRepository extends JpaRepository<DetailDutchpay, Long> {

    List<DetailDutchpay> findByDutchpayId(Long id);
}
