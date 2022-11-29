package com.ssafy.moti.dto.response.moti;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema
public class MotiDeadResponse {
    @Schema(description = "dead moti 리스트")
    private List<DeadMotiResponse> deadMotiList;
}
