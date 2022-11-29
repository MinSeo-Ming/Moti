package com.ssafy.moti.entity.dev.moti;

import com.ssafy.moti.common.enums.LevelType;
import com.ssafy.moti.common.enums.MotiSubType;
import com.ssafy.moti.common.enums.MotiType;
import lombok.*;

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
public class MotiCatalog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "moti_catalog_no")
    private Long motiCatalogNo;

    @NotNull
    @Enumerated(EnumType.STRING)
    private LevelType motiLevel;

    @NotNull
    @Enumerated(EnumType.STRING)
    private MotiType motiType;

    @NotNull
    @Enumerated(EnumType.STRING)
    private MotiSubType motiSubType;
}
