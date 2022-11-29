package com.ssafy.moti.dto.request.moti;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema
public class MotiCreateRequest {
    @Schema(description = "moti 생성 이름" , nullable = false)
    private String motiName;

}
