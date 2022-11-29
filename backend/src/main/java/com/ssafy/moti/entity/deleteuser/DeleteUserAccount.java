package com.ssafy.moti.entity.deleteuser;

import com.ssafy.moti.common.enums.AuthProvider;
import com.ssafy.moti.entity.dev.user.UserAccountID;
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
@Data
@Entity
@Table(
        name = "delete_user_accounts",
        schema = "delete_user"
)
@IdClass(UserAccountID.class)
public class DeleteUserAccount implements Serializable {
    @Id
    @JoinColumn(name = "user_no")
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private DeleteUser user;

    @Id
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    @Column(name = "provider_id", nullable = false)
    private String providerID;
}
