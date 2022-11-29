package com.ssafy.moti.dto.response.moti;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Moti All Info ResponseDto")
public class MotiAllInfoResponse {
    @Schema(description = "moti 전체 정보 - 밥 먹었는지 유무", example = "2022-11-07")
    private String lastFeedDay;
    @Schema(description = "moti 전체 정보 - 생존일")
    private Long liveDays;

    @Schema(description = "moti 전체 정보 - 애정도")
    private Long closeness;

    @Schema(description = "moti 전체 정보 - 이미지 리스트")
    public MotiImgListResponse motiImgList;


    @Schema(description = "moti 전체 정보 - 모티 이름")
    private String motiName;

    @Schema(description = "moti 전체 정보 - 모티 레벨")
    private String motiLevel;

    @Schema(description = "moti 전체 정보 - 탄생일")
    private String motiBirth;

    @Schema(description = "moti 전체 정보 -  성별")
    private String motiGender;

}
