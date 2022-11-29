package com.ssafy.moti.entity.dev.user;

import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString

@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"userName"})
        },
        schema = "dev"
)

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userNo;

    private String userName;

    @JsonIgnore
    private String password;
}
