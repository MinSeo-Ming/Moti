package com.ssafy.moti.entity.log;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(schema = "log")
public class UserDeleteLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userNo;

    @Column(nullable = false)
    private String movedDate;

    @Column(nullable = false)
    private String deleteDate;
}
