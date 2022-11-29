package com.ssafy.moti.entity.dev.user;

import com.ssafy.moti.common.enums.AuthProvider;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString

@Entity
@Data
@Table(
        name = "user_accounts",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "provider_id")
        },schema = "dev"
)
@IdClass(UserAccountID.class)
public class UserAccount implements Serializable {

    @Id
    @JoinColumn(name = "user_no")
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Id
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    @Column(name = "provider_id", nullable = false)
    private String providerID;
}
