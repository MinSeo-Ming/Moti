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
public class UserMotiInfo {

    @Id
    private Long id;
    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "user_no")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne
    @JoinColumn(name = "moti_catalog_no")
    @NotNull
    private MotiCatalog motiCatalog;

    @NotNull
    private String motiBirth;

    @NotNull
    private String motiGender;

    @NotNull
    private String motiName;

}
