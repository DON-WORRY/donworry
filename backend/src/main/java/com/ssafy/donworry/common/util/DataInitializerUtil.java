//package com.ssafy.donworry.common.util;
//
//import com.shinhan.shbhack.ijoa.domain.UploadFile;
//import com.shinhan.shbhack.ijoa.domain.bank.entity.Account;
//import com.shinhan.shbhack.ijoa.domain.bank.entity.Transaction;
//import com.shinhan.shbhack.ijoa.domain.bank.entity.TransactionCategory;
//import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.AccountRepository;
//import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.TransactionCategoryRepository;
//import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.TransactionRepository;
//import com.shinhan.shbhack.ijoa.domain.diary.entity.Diary;
//import com.shinhan.shbhack.ijoa.domain.diary.entity.DiaryRecord;
//import com.shinhan.shbhack.ijoa.domain.diary.repository.datajpa.DiaryImageRepository;
//import com.shinhan.shbhack.ijoa.domain.diary.repository.datajpa.DiaryRepository;
//import com.shinhan.shbhack.ijoa.domain.diary.repository.datajpa.DiaryShareRepository;
//import com.shinhan.shbhack.ijoa.domain.member.entity.*;
//import com.shinhan.shbhack.ijoa.domain.member.entity.enums.Accomplishment;
//import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ActivateStatus;
//import com.shinhan.shbhack.ijoa.domain.member.entity.enums.Gender;
//import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
//import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.*;
//import lombok.RequiredArgsConstructor;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.LocalDate;
//import java.time.LocalTime;
//
//@Component
//@RequiredArgsConstructor
//public class DataInitializerUtil implements CommandLineRunner {
//
//    private final MemberRepository memberRepository;
//    private final AccountRepository accountRepository;
//    private final TransactionRepository transactionRepository;
//    private final TransactionCategoryRepository transactionCategoryRepository;
//    private final FriendRepository friendRepository;
//    private final FamilyRepository familyRepository;
//    private final ProfileImageRepository profileImageRepository;
//    private final MissionRepository missionRepository;
//    private final NotificationRepository notificationRepository;
//    private final DiaryShareRepository diaryShareRepository;
//    private final DiaryRepository diaryRepository;
//    private final DiaryImageRepository diaryImageRepository;
//
//    @Override
//    @Transactional
//    public void run(String... args) throws Exception {
//
//        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
//
//        String pwd = "1Q2w3e4r!";
//
//        for(int i=1; i<10; ++i){
//
//            //member entity
//            //부모1
//            Member member1 = Member.builder()
//                    .email("byuri1356" + Integer.toString(i) + "@gmail.com")
//                    .name("유승민" + Integer.toString(i))
//                    .password(bCryptPasswordEncoder.encode(pwd))
//                    .phoneNumber("010-9814-1356")
//                    .gender(Gender.MALE)
//                    .memberRole(MemberRole.PARENT)
//                    .activateStatus(ActivateStatus.ACTIVATE)
//                    .birthDate(LocalDate.of(1997, 7, 29))
//                    .build();
//
//            //부모2
//            Member member2 = Member.builder()
//                    .email("byuri1356" + Integer.toString(i + 100) + "@gmail.com")
//                    .name("유승민" + Integer.toString(i + 100))
//                    .password(bCryptPasswordEncoder.encode(pwd))
//                    .phoneNumber("010-9814-1356")
//                    .gender(Gender.MALE)
//                    .memberRole(MemberRole.PARENT)
//                    .activateStatus(ActivateStatus.ACTIVATE)
//                    .birthDate(LocalDate.of(1997, 7, 29))
//                    .build();
//
//            //자식1
//            Member member3 = Member.builder()
//                    .email("byuri1356" + Integer.toString(i+200) + "@gmail.com")
//                    .name("유승민" + Integer.toString(i+200))
//                    .password(bCryptPasswordEncoder.encode(pwd))
//                    .phoneNumber("010-9814-1356")
//                    .gender(Gender.MALE)
//                    .memberRole(MemberRole.CHILD)
//                    .activateStatus(ActivateStatus.ACTIVATE)
//                    .birthDate(LocalDate.of(1997, 7, 29))
//                    .build();
//
//            //자식2
//            Member member4 = Member.builder()
//                    .email("byuri1356" + Integer.toString(i+300) + "@gmail.com")
//                    .name("유승민" + Integer.toString(i+300))
//                    .password(bCryptPasswordEncoder.encode(pwd))
//                    .phoneNumber("010-9814-1356")
//                    .gender(Gender.MALE)
//                    .memberRole(MemberRole.CHILD)
//                    .activateStatus(ActivateStatus.ACTIVATE)
//                    .birthDate(LocalDate.of(1997, 7, 29))
//                    .build();
//
//            memberRepository.save(member1);
//            memberRepository.save(member2);
//            memberRepository.save(member3);
//            memberRepository.save(member4);
//
//            //profile image entity
//            //1, 3, 5, 7, 9 ... 번째 회원만 프로필 사진 가지고있는걸 가정
//            UploadFile uploadFile = UploadFile.builder()
//                    .uploadFileName("TestUploadFileName" + Integer.toString(i))
//                    .storeFileName(("TestStoreFileName") + Integer.toString(i))
//                    .build();
//
//            ProfileImage profileImage1 = ProfileImage.builder()
//                    .uploadFile(uploadFile)
//                    .member(member1)
//                    .build();
//
//            ProfileImage profileImage2 = ProfileImage.builder()
//                    .uploadFile(uploadFile)
//                    .member(member3)
//                    .build();
//
//            profileImageRepository.save(profileImage1);
//            profileImageRepository.save(profileImage2);
//
//            // family entity
//            Family family1 = Family.builder()
//                    .parent(member1)
//                    .child(member3)
//                    .build();
//
//            Family family2 = Family.builder()
//                    .parent(member1)
//                    .child(member4)
//                    .build();
//
//            Family family3 = Family.builder()
//                    .parent(member2)
//                    .child(member3)
//                    .build();
//
//            Family family4 = Family.builder()
//                    .parent(member2)
//                    .child(member4)
//                    .build();
//
//            familyRepository.save(family1);
//            familyRepository.save(family2);
//            familyRepository.save(family3);
//            familyRepository.save(family4);
//
//            // friend entity
//            // 1 -> 2, 3, 4  || 5 -> 6, 7, 8
//            Friend friend1 = Friend.builder()
//                    .firstFriend(member1)
//                    .secondFriend(member2)
//                    .build();
//
//            Friend friend2 = Friend.builder()
//                    .firstFriend(member1)
//                    .secondFriend(member3)
//                    .build();
//
//            Friend friend3 = Friend.builder()
//                    .firstFriend(member1)
//                    .secondFriend(member4)
//                    .build();
//
//            friendRepository.save(friend1);
//            friendRepository.save(friend2);
//            friendRepository.save(friend3);
//
//
//            // mission entity
//            // 부모 1이 자식 1,2한테 부모 2이 자식 1,2 한테 미션 부여
//            LocalDate baseDate = LocalDate.of(2023, i%1 + 1, i%27 + 1);
//
//            Mission mission1 = Mission.builder()
//                    .title("미션" + Integer.toString(i))
//                    .content("테스트 미션 : "  + Integer.toString(i))
//                    .reward(new Long(i * 3841))
//                    .startDate(baseDate)
//                    .endDate(baseDate.plusDays(5))
//                    .accomplishment(Accomplishment.INCOMPLETE)
//                    .writer(member1)
//                    .challenger(member3)
//                    .build();
//
//            Mission mission2 = Mission.builder()
//                    .title("미션" + Integer.toString(i + 100))
//                    .content("테스트 미션 : "  + Integer.toString(i + 100))
//                    .reward(new Long(i * 3441))
//                    .startDate(baseDate)
//                    .endDate(baseDate.plusDays(5))
//                    .accomplishment(Accomplishment.CHECKING)
//                    .writer(member1)
//                    .challenger(member4)
//                    .build();
//
//            Mission mission3 = Mission.builder()
//                    .title("미션" + Integer.toString(i + 200))
//                    .content("테스트 미션 : "  + Integer.toString(i + 200))
//                    .reward(new Long(i * 3541))
//                    .startDate(baseDate)
//                    .endDate(baseDate.plusDays(5))
//                    .accomplishment(Accomplishment.COMPLETE)
//                    .writer(member2)
//                    .challenger(member3)
//                    .build();
//
//            Mission mission4 = Mission.builder()
//                    .title("미션" + Integer.toString(i + 300))
//                    .content("테스트 미션 : "  + Integer.toString(i + 300))
//                    .reward(new Long(i * 3141))
//                    .startDate(baseDate)
//                    .endDate(baseDate.plusDays(5))
//                    .accomplishment(Accomplishment.INCOMPLETE)
//                    .writer(member2)
//                    .challenger(member4)
//                    .build();
//
//            missionRepository.save(mission1);
//            missionRepository.save(mission2);
//            missionRepository.save(mission3);
//            missionRepository.save(mission4);
//
//            // account entity
//            // 1인당 계좌 한개
//            Account account1 = Account.builder()
//                    .name("부모계좌" + Integer.toString(i))
//                    .balance(new Long(i * 10000000))
//                    .accountNumber("1234-1234-1234" + Integer.toString(i))
//                    .member(member1)
//                    .build();
//
//            Account account2 = Account.builder()
//                    .name("부모계좌" + Integer.toString(i+100))
//                    .balance(new Long(i * 20000000))
//                    .accountNumber("1234-1234-1234" + Integer.toString(i + 100))
//                    .member(member2)
//                    .build();
//
//            Account account3 = Account.builder()
//                    .name("아이계좌" + Integer.toString(i+200))
//                    .balance(new Long(i * 1000))
//                    .accountNumber("1234-1234-1234" + Integer.toString(i + 200))
//                    .member(member3)
//                    .build();
//
//            Account account4 = Account.builder()
//                    .name("아이계좌" + Integer.toString(i+300))
//                    .balance(new Long(i * 20000))
//                    .accountNumber("1234-1234-1234" + Integer.toString(i + 300))
//                    .member(member4)
//                    .build();
//
//            accountRepository.save(account1);
//            accountRepository.save(account2);
//            accountRepository.save(account3);
//            accountRepository.save(account4);
//
//            // diary entity
//            Diary diary1 = Diary.builder()
//                    .member(member1)
//                    .title("기분 좋은 하루" + Integer.toString(i))
//                    .content("오늘 하루는 정말 기분이 좋았다. 맛있는 음식을 먹었기 때문이다." + Integer.toString(i))
//                    .emotion("좋음")
//                    .diary_date(baseDate)
//                    .build();
//
//            Diary diary2 = Diary.builder()
//                    .member(member1)
//                    .title("기분 매우 좋은 하루" + Integer.toString(i+ 100))
//                    .content("오늘 하루는 정말 기분이 매우 좋았다. 매우 맛있는 음식을 먹었기 때문이다." + Integer.toString(i + 100))
//                    .emotion("매우 좋음")
//                    .diary_date(baseDate.minusDays(5))
//                    .build();
//
//            Diary diary3 = Diary.builder()
//                    .member(member1)
//                    .title("기분 평범한 하루" + Integer.toString(i + 200))
//                    .content("오늘 하루는 정말 기분이 평범했다. 평범한 음식을 먹었기 때문이다." + Integer.toString(i + 200))
//                    .emotion("평범")
//                    .diary_date(baseDate.minusDays(10))
//                    .build();
//
//            Diary diary4 = Diary.builder()
//                    .member(member1)
//                    .title("기분 나쁜 하루" + Integer.toString(i + 300))
//                    .content("오늘 하루는 정말 나빳다. 맛없는 음식을 먹었기 때문이다." + Integer.toString(i + 300))
//                    .emotion("나쁨")
//                    .diary_date(baseDate.minusDays(20))
//                    .build();
//
//            diaryRepository.save(diary1);
//            diaryRepository.save(diary2);
//            diaryRepository.save(diary3);
//            diaryRepository.save(diary4);
//
//            //diary record entity
//            //1번 다이리만 다이어리 사진이 있다고 가정
//            DiaryRecord diaryRecord1 = DiaryRecord.builder()
//                    .uploadFileName("TestUploadFileName" + Integer.toString(i))
//                    .storeFileName("StoreFileName" + Integer.toString(i))
//                    .diary(diary1)
//                    .build();
//
//        }
//
//        category();
//    }
//
//
//    public void bank() throws Exception{
//
//        category();
//        account_01();
//        account_02("110222333333");
//    }
//    public void category() throws Exception{
//
//        TransactionCategory category_01 = TransactionCategory.builder()
//                .id(1)
//                .name("쇼핑")
//                .build();
//        TransactionCategory category_02 = TransactionCategory.builder()
//                .id(2)
//                .name("편의점·마트·잡화")
//                .build();
//        TransactionCategory category_03 = TransactionCategory.builder()
//                .id(3)
//                .name("이체")
//                .build();
//        TransactionCategory category_04 = TransactionCategory.builder()
//                .id(4)
//                .name("교통")
//                .build();
//        TransactionCategory category_05 = TransactionCategory.builder()
//                .id(5)
//                .name("취미")
//                .build();
//        TransactionCategory category_06 = TransactionCategory.builder()
//                .id(6)
//                .name("카페·간식")
//                .build();
//        TransactionCategory category_07 = TransactionCategory.builder()
//                .id(7)
//                .name("식비")
//                .build();
//        TransactionCategory category_08 = TransactionCategory.builder()
//                .id(8)
//                .name("ATM 입출금")
//                .build();
//
//
//        transactionCategoryRepository.save(category_01);
//        transactionCategoryRepository.save(category_02);
//        transactionCategoryRepository.save(category_03);
//        transactionCategoryRepository.save(category_04);
//        transactionCategoryRepository.save(category_05);
//        transactionCategoryRepository.save(category_06);
//        transactionCategoryRepository.save(category_07);
//        transactionCategoryRepository.save(category_08);
//    }
//    public void account_01() throws Exception{
//        Account account = Account.builder()
//                .accountNumber("110111222222")
//                .balance(Long.parseLong("100000"))
//                .name("김신한")
//                .build();
//        Transaction transaction_01 = Transaction.builder()
//                .transactionDay(LocalDate.of(2023,9,1))
//                .transactionTime(LocalTime.of(14,20))
//                .accountNumber("110111222222")
//                .transactionType(1)
//                .content("엄마 용돈")
//                .balance(Long.parseLong("1300000"))
//                .depositAmount(Long.parseLong("30000"))
//                .withdrawAmount(Long.parseLong("0"))
//                .category(3)
//                .build();
//        Transaction transaction_02 = Transaction.builder()
//                .transactionDay(LocalDate.of(2023,9,2))
//                .transactionTime(LocalTime.of(14,25))
//                .accountNumber("110111222222")
//                .transactionType(2)
//                .content("다이소")
//                .balance(Long.parseLong("1200000"))
//                .depositAmount(Long.parseLong("0"))
//                .withdrawAmount(Long.parseLong("10000"))
//                .category(2)
//                .build();
//        Transaction transaction_03 = Transaction.builder()
//                .transactionDay(LocalDate.of(2023,9,3))
//                .transactionTime(LocalTime.of(17,20))
//                .accountNumber("110111222222")
//                .transactionType(2)
//                .content("출금")
//                .balance(Long.parseLong("1000000"))
//                .depositAmount(Long.parseLong("20000"))
//                .withdrawAmount(Long.parseLong("0"))
//                .category(8)
//                .build();
//        accountRepository.save(account);
//
//        transactionRepository.save(transaction_01);
//        transactionRepository.save(transaction_02);
//        transactionRepository.save(transaction_03);
//
//    }
//    public void account_02(String accountNumber) throws Exception{
//        Account account = Account.builder()
//                .accountNumber(accountNumber)
//                .balance(Long.parseLong("100000"))
//                .name("김쏠쏠")
//                .build();
//        Transaction transaction_01 = Transaction.builder()
//                .transactionDay(LocalDate.of(2023,9,1))
//                .transactionTime(LocalTime.of(14,20))
//                .accountNumber(accountNumber)
//                .transactionType(1)
//                .content("엄마 용돈")
//                .balance(Long.parseLong("1300000"))
//                .depositAmount(Long.parseLong("30000"))
//                .withdrawAmount(Long.parseLong("0"))
//                .category(3)
//                .build();
//        Transaction transaction_02 = Transaction.builder()
//                .transactionDay(LocalDate.of(2023,9,2))
//                .transactionTime(LocalTime.of(14,25))
//                .accountNumber(accountNumber)
//                .transactionType(2)
//                .content("다이소")
//                .balance(Long.parseLong("1200000"))
//                .depositAmount(Long.parseLong("0"))
//                .withdrawAmount(Long.parseLong("10000"))
//                .category(2)
//                .build();
//        Transaction transaction_03 = Transaction.builder()
//                .transactionDay(LocalDate.of(2023,9,3))
//                .transactionTime(LocalTime.of(17,20))
//                .accountNumber(accountNumber)
//                .transactionType(2)
//                .content("출금")
//                .balance(Long.parseLong("1000000"))
//                .depositAmount(Long.parseLong("20000"))
//                .withdrawAmount(Long.parseLong("0"))
//                .category(8)
//                .build();
//        accountRepository.save(account);
//
//        transactionRepository.save(transaction_01);
//        transactionRepository.save(transaction_02);
//        transactionRepository.save(transaction_03);
//
//    }
//
//    public void family(){
//
//    }
//}
