package com.ssafy.moti.dto.response.moti;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema
public class MotiImgListResponse {

    @Schema(name ="moti  이미지 LIST")
    private String hungryImg;

    @Schema(name ="moti  이미지 LIST")
    private String defaultImg;

    @Schema(name ="moti  이미지 LIST")
    private String eatingImg;

    @Schema(name ="moti  이미지 LIST")
    private String playingImg;

    @Schema(name ="moti  이미지 LIST")
    private String showerImg;

}
