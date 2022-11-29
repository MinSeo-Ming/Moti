package com.ssafy.moti.entity.log;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(schema = "log")
public class MotiCleanLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String timerDate;

    @NotNull
    private String timerTime;

    @NotNull
    private Long userNo;

}
