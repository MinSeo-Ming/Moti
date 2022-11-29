package com.ssafy.moti.controller;

import com.ssafy.moti.common.auth.UserPrincipal;
import com.ssafy.moti.dto.request.moti.MotiCreateRequest;
import com.ssafy.moti.dto.response.BaseResponse;
import com.ssafy.moti.dto.response.moti.*;
import com.ssafy.moti.service.moti.MotiService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

@Api(tags = "moti controller")
@RestController
@RequestMapping("api/v1/moti")
@Slf4j
public class MotiController {
    @Autowired
    MotiService motiService;

    @PostMapping("")
    @Operation(responses = {
            @ApiResponse(responseCode = "201", description = "모티 생성 성공"),
            @ApiResponse(responseCode = "204", description = "이미 모티가 생성되어 있어 생성안됨"),
            @ApiResponse(responseCode = "400", description = "모티이름이 유효하지 않습니다"),
    })
    @ApiOperation(value = "모티 생성")
    public ResponseEntity<? > createMoti(
            @ApiIgnore Authentication authentication,
            @ApiParam (value = "모티 이름", required = true)@RequestBody MotiCreateRequest motiCreateRequest
            ){
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userNo = userPrincipal.getId();
        log.debug("create user no"+userNo);
        log.debug("create user name"+ motiCreateRequest.getMotiName());

        try {
            motiService.createMoti(motiCreateRequest.getMotiName(), userNo);
        }catch (IllegalAccessException e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("유저/모티가 없음");
        }catch (IllegalStateException e){
            if(e.getMessage().equals("이미 모티가 존재함")) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("moti가 이미 있음");
            }
            if(e.getMessage().equals("이름이 너무 길거나 짧거나 띄어쓰기가 포함되어 있습니다.")){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("모티 이름이 너무 길거나 짧거나 띄어쓰기가 포함되어 있습니다.");
            }
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("moti 생성 됨");

        }


    @GetMapping("/fed-today")
    @Operation(responses = {
            @ApiResponse(
                    responseCode = "200",
                    description = "모티 오늘 밥 먹음 true 반환 아니면 false 반환",

                    content ={
                            @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = MotiFedCheckResponse.class)
                    )
                }
            ),
            @ApiResponse(responseCode = "406", description = "사용자가 없거나 모티가 없음"),
    })
    @ApiOperation(value = "오늘 밥을 주었는지 확인")
    public ResponseEntity<?> getMotiFedToday
            (@ApiIgnore Authentication authentication){
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userNo = userPrincipal.getId();
        MotiFedCheckResponse motiFedCheckResponse = new MotiFedCheckResponse();
        try {
            boolean flag = motiService.checkFedToday(userNo);
            motiFedCheckResponse.setFedCheck(flag);

        }catch (IllegalAccessException ia){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("유저/모티가 없음");
        }catch (IllegalStateException is){
            String message = is.getMessage();
            if(message.equals("모티 정보가 없음")){
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("유저/모티가 없음");
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(motiFedCheckResponse);

    }

    @GetMapping("")
    @Operation(
            responses = {
            @ApiResponse(
                    responseCode = "200",
                    description = "살아 있는 모티 전체 정보입니다.",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = MotiAllInfoResponse.class)
                            )
                    }

            ),
            @ApiResponse(responseCode = "406", description = "모티가 없거나 사용자가 없습니다!"),
    })
    @ApiOperation(value = "모티 전체 정보")
    public ResponseEntity<?> getMotiStatus(
            @ApiIgnore Authentication authentication){
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userNo = userPrincipal.getId();
        MotiAllInfoResponse motiAllInfoResponse =new MotiAllInfoResponse();
        try {
            motiAllInfoResponse = motiService.getAllMotiInfo(userNo);
        }catch (IllegalAccessException ia){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("유저/모티가 없음");
        }catch (IllegalStateException is){
            String message = is.getMessage();
            if(message.equals("모티 정보가 없음")){
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("유저/모티가 없음");
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(motiAllInfoResponse);
    }

    @PostMapping("/play-moti")
    @Operation(responses ={
            @ApiResponse(responseCode = "200", description = "모티 놀아주기 성공"),
            @ApiResponse(responseCode = "204", description = "하루에 놀아줄 수 있는 모티 상한선 도달함"),
            @ApiResponse(responseCode = "400", description = "에러 발생"),
            @ApiResponse(responseCode = "406", description = "유저가 없습니다"),
    })
    @ApiOperation(value = "모티 놀아주기")
    public ResponseEntity<?> playMoti( @ApiIgnore Authentication authentication){
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Long userNo = userPrincipal.getId();

        int result=-1;
        try {
            result= motiService.playingMoti(userNo);
        }catch (IllegalAccessException ia){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("유저/모티가 없음");
        }catch (IllegalStateException is){
            String message = is.getMessage();
            if(message.equals("모티 정보가 없음")){
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("유저/모티가 없음");
            }
        }

       if(result==0){
            return ResponseEntity.ok(BaseResponse.of(204, "모티 놀아주는 상한선 도달!"));
        }else if(result==1){
            return ResponseEntity.ok(BaseResponse.of(200, "모티 놀아주기 성공"));
        }else {
            return ResponseEntity.status(404).body(BaseResponse.of(404,"에러 발생"));
        }
    }

    @PostMapping("/food")
    @Operation(responses ={
            @ApiResponse(responseCode = "200", description = "모티 밥주기 성공",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = MotiFeedResponseResponse.class)
                            )
                    }),
            @ApiResponse(responseCode = "204", description = "커밋을 하지 않고 밥을 준 경우/커밋후 밥을 주세요!"),
            @ApiResponse(responseCode = "400", description = "밥그릇에 있는 모든 repository가 github 계정에서 삭제되었습니다"),
            @ApiResponse(responseCode = "404", description = "에러 발생"),
            @ApiResponse(responseCode = "406", description = "유저 또는 모티 또는 밥그릇이 유효하지 않습니다"),
                })
    @ApiOperation(value = "모티 밥먹이기")
    public ResponseEntity<?> feedMoti(@ApiIgnore Authentication authentication){
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userNo = userPrincipal.getId();
        String userName = userPrincipal.getName();

        MotiFeedResponseResponse motiFeedResponseResponse =new MotiFeedResponseResponse();
        try {
            motiFeedResponseResponse =motiService.feedMoti(userNo,userName);
        }catch (IllegalAccessException ia){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("유저/모티가 없음");
        }catch (IllegalStateException is){
            String message = is.getMessage();
            if(message.equals("repo 전체 삭제")||message.equals("밥그릇 없음")||message.equals("밥그릇에 하나도 repo가 없음")){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("밥그릇이 전부 삭제 되었어요!");
            }else if(message.equals("commit 없음")){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("커밋하고 밥 주세요!"); //204
            }else if(message.equals("모티 정보가 없음")){
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("유저/모티가 없음");
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("에러발생");
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(motiFeedResponseResponse);

    }

    @PostMapping("/clean-moti")
    @Operation(responses ={
            @ApiResponse(responseCode = "200", description = "모티 씻기기 성공"),
            @ApiResponse(responseCode = "204", description = "하루에 씻길 수 있는 모티 상한선 도달함"),
            @ApiResponse(responseCode = "400", description = "에러 발생"),
            @ApiResponse(responseCode = "406", description = "유저/모티가 없습니다"),
    })
    @ApiOperation(value = "모티 씻기기")
    public ResponseEntity<? > cleanMoti( @ApiIgnore Authentication authentication){
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Long userNo = userPrincipal.getId();

        int result = -1;
        try {
            result=motiService.cleaningMoti(userNo);
        }catch (IllegalAccessException ia){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("유저/모티가 없음");
        }catch (IllegalStateException is){
            String message = is.getMessage();
            if(message.equals("모티 정보가 없음")){
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("유저/모티가 없음");
            }
        }

        if(result==0){
            return ResponseEntity.ok(BaseResponse.of(204, "모티 씻기는 상한선 도달!"));
        }else if(result==1){
            return ResponseEntity.ok(BaseResponse.of(200, "모티 씻기기 성공"));
        }else {
            return ResponseEntity.status(404).body(BaseResponse.of(404,"에러 발생"));
        }
    }

    @GetMapping("/graves")
    @Operation(responses ={
            @ApiResponse(responseCode = "200", description = "죽은 모티 리스트",content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = MotiDeadResponse.class)
                    )
            }),
            @ApiResponse(responseCode = "204", description = "죽은 모티가 없습니다"),
            @ApiResponse(responseCode = "400", description = "에러 발생")
    })
    @ApiOperation(value = "죽은 모티 리스트")
    public ResponseEntity<?> getMotiDeadList(@ApiIgnore Authentication authentication){
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userNo = userPrincipal.getId();
        List<DeadMotiResponse> deadMotis = new ArrayList<>();
        try {

            deadMotis=motiService.deadMotiList(userNo);
        }catch (IllegalAccessException ia){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("유저/모티가 없음");
        }catch (IllegalStateException is){
            String message = is.getMessage();
            if(message.equals("모티 정보가 없음")){
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("유저/모티가 없음");
            }
        }
        if(deadMotis.size()==0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("죽은 모티가 없습니다");
        }else if(deadMotis.size()>0) {
            return ResponseEntity.status(HttpStatus.OK).body(deadMotis);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("에러 발생");
        }
    }

    @GetMapping("/ranking")
    @Operation(responses ={
            @ApiResponse(responseCode = "200", description = "모티 랭킹 100위 반환",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = MotiRankListResponse.class)
                            )
                    }),
            @ApiResponse(responseCode = "406", description = "유저가 없습니다"),
    })
    @ApiOperation(value = "모티 랭킹")
    public ResponseEntity<?> getMotiImageList(@ApiIgnore Authentication authentication){
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userName = userPrincipal.getName();

        MotiRankListResponse motiRankListResponse = new MotiRankListResponse();

        try {
            motiRankListResponse =motiService.getRanking(userName);
        }catch (IllegalAccessException ia){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("유저/모티가 없음");
        }catch (IllegalStateException is){
            String message = is.getMessage();
            if(message.equals("모티 정보가 없음")){
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("유저/모티가 없음");
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(motiRankListResponse);

    }
}
