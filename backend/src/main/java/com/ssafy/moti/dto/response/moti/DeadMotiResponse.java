package com.ssafy.moti.dto.response.moti;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema
public class DeadMotiResponse {
    @Schema(description  ="dead moti info - 내 rank",example = "1")
    private Long deadMotiNo;

    @Schema(description  ="dead moti info - 모티가 태어난 날짜",example = "2022-11-09")
    private String motiBirth;

    @Schema(description  ="dead moti info - 모티가 죽은 날짜",example = "2022-11-11")
    private String motiDeath;

    @Schema(description  ="dead moti info - 모티 성별",example = "female")
    private String motiGender;

    @Schema(description  ="dead moti info - 모티 이름",example = "motimoti")
    private String motiName;
    @Schema(description  ="dead moti info - 모티 이미지")
    private String motiUrl;
}
