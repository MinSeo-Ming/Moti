package com.ssafy.moti.dto.response.moti;

import com.ssafy.moti.entity.dev.moti.Ranking;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema
public class MotiRankListResponse {
    @Schema(description  ="moti rank list - 내 rank")
    private Ranking myRanking;

    @Schema(description  ="moti rank list - moti rank 리스트 ")
    private List<Ranking> rankings;

}
