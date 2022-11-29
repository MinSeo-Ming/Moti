package com.ssafy.moti.entity.dev.user;

import com.ssafy.moti.entity.dev.user.User;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(schema = "dev")
public class UserTheme {
    @Id
    private Long id;

    @MapsId
    @OneToOne
    @JoinColumn(name = "user_no")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(nullable = false)
    private String deviceColor;

    @Column(nullable = false)
    private String buttonColor;
}
