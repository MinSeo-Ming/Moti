package com.ssafy.moti.entity.dev.moti;

import com.ssafy.moti.common.enums.MotiStatusType;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@Entity
@IdClass(MotiImgId.class)
@EqualsAndHashCode
@AllArgsConstructor
@Builder
@ToString
@Table(schema = "dev")
public class MotiImg implements Serializable {
    @Id
    @Enumerated(EnumType.STRING)
    private MotiStatusType motiCode;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "moti_catalog_no")
    @NotNull
    private MotiCatalog motiCatalog;

    @NotNull
    private String motiImg;





}
