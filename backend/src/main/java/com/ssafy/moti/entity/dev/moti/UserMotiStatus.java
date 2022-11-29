package com.ssafy.moti.entity.dev.moti;

import com.ssafy.moti.entity.dev.user.User;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(schema = "dev")
public class UserMotiStatus {
    @Id
    private Long id;
    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "user_no")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;
    @NotNull
    private String latestFeedDate;
    @NotNull
    private String latestFeedTime;
    @NotNull
    private String latestCleanDate;
    @NotNull
    private Long liveDays;
    @NotNull
    private Long closeness;
    @NotNull
    private Long survivalDays;
}
