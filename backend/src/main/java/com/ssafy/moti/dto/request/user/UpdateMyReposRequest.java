package com.ssafy.moti.dto.request.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@Schema(description = "밥그릇 수정 DTO")
@Getter
public class UpdateMyReposRequest {
    @Schema(description = "밥그릇 목록")
    List<String> repos;
}
