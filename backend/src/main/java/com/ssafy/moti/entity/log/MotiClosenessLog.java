package com.ssafy.moti.entity.log;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ToString
@Table(schema = "log")
public class MotiClosenessLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String timerDate;

    @NotNull
    private String timerTime;

    @NotNull
    private Long userNo;

    @NotNull
    private Long closenessBeforeEvent;

    @NotNull
    private Long closenessAfterEvent;
}
