package com.ssafy.donworry.api.service.member.query;

import com.ssafy.donworry.api.service.member.request.EmailCheckAuthCodeServiceRequest;
import com.ssafy.donworry.common.error.ErrorCode;
import com.ssafy.donworry.common.error.exception.EntityNotFoundException;
import com.ssafy.donworry.common.error.exception.InvalidValueException;
import com.ssafy.donworry.common.util.RedisUtil;
import com.ssafy.donworry.domain.member.repository.MemberRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Optional;
import java.util.Random;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EmailQueryService {

    private final JavaMailSender mailSender;
    private final MemberRepository memberRepository;
    private final RedisUtil redisUtil;

    public void joinEmail(String email){
        if(memberRepository.existsByMemberEmail(email))
            throw new EntityNotFoundException(ErrorCode.MEMBER_DUPLICATE);

        String authCode = createAuthCode();

        try{
            MimeMessage emailForm = createEmailForm(email, authCode);
            mailSender.send(emailForm);
        } catch (Exception e){
            throw new InvalidValueException(ErrorCode.EMAIL_FORM_ERROR);
        }

        redisUtil.setEmail(email, authCode);
    }

    private String createAuthCode() {
        int lenth = 6;
        try {
            Random random = SecureRandom.getInstanceStrong();
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < lenth; i++) {
                builder.append(random.nextInt(10));
            }
            return builder.toString();
        } catch (NoSuchAlgorithmException e) {
            log.debug("랜덤 값 생성 실패");
            throw new InvalidValueException(ErrorCode.INVALID_INPUT_VALUE);
        }
    }

    private MimeMessage createEmailForm(String email, String authCode) throws MessagingException, UnsupportedEncodingException {
        String senderEmail = "noreply@moailgi.com"; // Replace with your email address (sender)
        String senderName = "돈워리"; // Replace with your name (sender)

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
        helper.setTo(email); // Set recipient email address
        helper.setFrom(new InternetAddress(senderEmail, senderName)); // Set sender email and name
        helper.setSubject("Verification Code for Your Account"); // Set email subject

        // Email content with the generated verification code
        String emailContent = "<html><body style=\"font-family: Arial, sans-serif;\">"
                + "<h2>안녕하세요!!</h2>"
                + "<p>돈워리 사이트에 회원가입을 해주셔서 감사합니다!</p>"
                + "<p>인증코드입니다.:</p>"
                + "<h3 style=\"background-color: #f0f0f0; padding: 10px;\">" + authCode + "</h3>"
                + "<p>Please use this code to verify your account.</p>"
                + "<p>Best regards,<br/>Your Website Team</p>"
                + "</body></html>";

        helper.setText(emailContent, true); // Set email content as HTML

        return message;
    }

    public void checkEmailAuthCode(EmailCheckAuthCodeServiceRequest request){
        Optional<String> authCode = redisUtil.getEmail(request.email());
        if(!authCode.isPresent()) throw new InvalidValueException(ErrorCode.EMAIL_NOT_FOUND);
        if(!authCode.get().equals(request.authCode())) throw new InvalidValueException(ErrorCode.AUTH_CODE_ERROR);

    }

}
