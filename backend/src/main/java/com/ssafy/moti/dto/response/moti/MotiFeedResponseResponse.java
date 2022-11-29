package com.ssafy.moti.dto.response.moti;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema
public class MotiFeedResponseResponse {
    @Schema(name = "moti 밥주기 반환 - token 수")
    private Long tokens;

}
