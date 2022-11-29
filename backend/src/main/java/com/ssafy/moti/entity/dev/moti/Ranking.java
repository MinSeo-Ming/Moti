package com.ssafy.moti.entity.dev.moti;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(schema = "dev")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Ranking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long rank;
    
    @NotNull
    private String motiName;

    @NotNull
    private Long liveDays;

    @NotNull
    private String userName;

    @NotNull
    private String motiImg;

    @NotNull
    private Long closeness;
}
