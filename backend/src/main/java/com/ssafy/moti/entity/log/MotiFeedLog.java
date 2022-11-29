package com.ssafy.moti.entity.log;

import com.ssafy.moti.common.enums.FeedType;
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
public class MotiFeedLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String timerDate;
    @NotNull
    private String timerTime;

    @NotNull
    private Long userNo;

    @Enumerated(EnumType.STRING)
    @NotNull
    private FeedType feedCode;
}
