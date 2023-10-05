package com.ssafy.donworry.batch.chunk;

import com.ssafy.donworry.domain.member.entity.Member;
import com.ssafy.donworry.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AccountItemWriter implements ItemWriter<Member> {

    private final AccountService accountService;

    @Override
    public void write(Chunk<? extends Member> member) throws Exception {
        member.forEach(accountService::createMemberConsumption);
    }
}
