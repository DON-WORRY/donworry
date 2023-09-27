package com.ssafy.donworry.api.service.member;


import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.domain.member.repository.EmitterRepository;
import com.ssafy.donworry.domain.member.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.yaml.snakeyaml.emitter.Emitter;

import java.io.IOException;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class NotificationService {
    public void createNotification(){

    }


}
