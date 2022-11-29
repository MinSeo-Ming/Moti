package com.ssafy.moti.dto.response.moti;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Moti Fed Check dto")
public class MotiFedCheckResponse {
    @Schema(description = "모티 밥먹였는지 여부")
    private boolean fedCheck;
}
