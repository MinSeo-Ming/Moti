package com.ssafy.moti.entity.deleteuser;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(schema = "delete_user")
public class DeleteDeadMoti {
    @Id
    private Long deadMotiNo;

    private String motiBirth;

    private String motiDeath;

    private String motiGender;

    private String motiName;

    @ManyToOne
    @JoinColumn(name = "user_no")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private DeleteUser user;

    @Column(name = "moti_catalog_no")
    private Long motiCatalog;
}
