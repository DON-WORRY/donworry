package com.ssafy.donworry.domain.member.entity;

import com.ssafy.donworry.domain.BaseEntity;
import com.ssafy.donworry.domain.finance.entity.Consumption;
import com.ssafy.donworry.domain.finance.entity.DetailDutchpay;
import com.ssafy.donworry.domain.finance.entity.Dutchpay;
import com.ssafy.donworry.domain.finance.entity.Income;
import com.ssafy.donworry.domain.member.entity.enums.NotificationStatus;
import com.ssafy.donworry.domain.member.entity.enums.NotificationType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Notification extends BaseEntity {

    @Id
    @Column(name = "notification_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

//    private Long notificationPayment;

    @NotNull
    private String notificationContent;

    @NotNull
    @Enumerated(STRING)
    private NotificationType notificationType;

    @NotNull
    @Enumerated(STRING)
    private NotificationStatus notificationStatus;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "receiver_id")
    private Member receiver;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "sender_id")
    private Member sender;



    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "income_id")
    private Income income;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "consumption_id")
    private Consumption consumption;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "friend_request_id")
    private FriendRequest friendRequest;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "friend_relationship_id")
    private FriendRelationship friendRelationship;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "detail_dutchpay_id")
    private DetailDutchpay detailDutchpay;

    @Builder
    public Notification(Long id, String notificationContent, NotificationType notificationType, NotificationStatus notificationStatus, Member receiver, Member sender, DetailDutchpay detailDutchpay, Income income, Consumption consumption, FriendRequest friendRequest, FriendRelationship friendRelationship) {
        this.id = id;
        this.notificationContent = notificationContent;
        this.notificationType = notificationType;
        this.notificationStatus = notificationStatus;
        this.receiver = receiver;
        this.sender = sender;
        this.detailDutchpay = detailDutchpay;
        this.income = income;
        this.consumption = consumption;
        this.friendRequest = friendRequest;
        this.friendRelationship = friendRelationship;
    }

    public static Notification ofFriendReq(FriendRequest request){
        return Notification.builder()
                .notificationContent(request.getSender().getMemberName() + "님이 친구요청을 보냈습니다.")
                .notificationType(NotificationType.FRIENDREQ)
                .notificationStatus(NotificationStatus.UNCONFIRM)
                .receiver(request.getReceiver())
                .sender(request.getSender())
                .friendRequest(request)
                .build();
    }

    public static Notification ofFriendRel(FriendRelationship request){
        return Notification.builder()
                .notificationContent(request.getReceiver().getMemberName() + "님과 친구가 되었습니다.")
                .notificationType(NotificationType.FRIENDREL)
                .notificationStatus(NotificationStatus.UNCONFIRM)
                .receiver(request.getSender())
                .sender(request.getReceiver())
                .friendRelationship(request)
                .build();
    }

    public static Notification ofIncome(Income request){
        return Notification.builder()
                .notificationContent(request.getIncomeDetail())
                .notificationType(NotificationType.INCOME)
                .notificationStatus(NotificationStatus.UNCONFIRM)
                .receiver(request.getMember())
                .sender(request.getSenderAccount().getMember())
                .income(request)
                .build();
    }

    public static Notification ofConsumption(Consumption request){
        return Notification.builder()
                .notificationContent(request.getConsumptionDetail())
                .notificationType(NotificationType.CONSUMPTION)
                .notificationStatus(NotificationStatus.UNCONFIRM)
                .receiver(request.getMember())
                .sender(request.getReceiverAccount().getMember())
                .consumption(request)
                .build();
    }

    // request.getMember는 알림 받는사람, member는 알림 보낸 사람
    public static Notification ofDetailDutchpay(DetailDutchpay request, Member member){
        return Notification.builder()
                .notificationContent(member.getMemberName() + "님이 더치페이 요청을 하였습니다.")
                .notificationType(NotificationType.DUTCHREQ)
                .notificationStatus(NotificationStatus.UNCONFIRM)
                .receiver(request.getMember())
                .sender(member)
                .detailDutchpay(request)
                .build();
    }

    public void updateNotificationStatus(){
        this.notificationStatus = NotificationStatus.CONFIRM;
    }

}
