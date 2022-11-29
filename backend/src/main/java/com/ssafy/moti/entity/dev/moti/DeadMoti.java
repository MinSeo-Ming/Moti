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
public class DeadMoti {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deadMotiNo;

    @NotNull
    private String motiBirth;

    @NotNull
    private String motiDeath;

    @NotNull
    private String motiGender;

    @NotNull
    private String motiName;

    @ManyToOne
    @JoinColumn(name = "user_no",insertable = false,updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    private User user;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "moti_catalog_no",insertable = false,updatable = false)
    private MotiCatalog motiCatalog;



}
