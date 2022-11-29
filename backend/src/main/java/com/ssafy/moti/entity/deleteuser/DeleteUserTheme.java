package com.ssafy.moti.entity.deleteuser;

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
@Table(schema = "delete_user")
public class DeleteUserTheme {
    @Id
    private Long id;

    @MapsId
    @OneToOne
    @JoinColumn(name = "user_no")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private DeleteUser user;

    @Column(nullable = false)
    private String deviceColor;

    @Column(nullable = false)
    private String buttonColor;
}
