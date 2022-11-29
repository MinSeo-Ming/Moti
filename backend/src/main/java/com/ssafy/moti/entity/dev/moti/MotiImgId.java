package com.ssafy.moti.entity.dev.moti;

import com.ssafy.moti.common.enums.MotiStatusType;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
@ToString
public class MotiImgId implements Serializable  {
    @NotNull
    private MotiStatusType motiCode;

    @NotNull
    private Long motiCatalog;


}
