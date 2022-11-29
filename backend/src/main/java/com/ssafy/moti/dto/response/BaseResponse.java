package com.ssafy.moti.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

/*
  기본 Response 정의
*/
@Getter
@Setter
@AllArgsConstructor
@ApiModel("BaseResponse")
public class BaseResponse {

    @ApiModelProperty(name="응답 메세지", example="정상")
    String message = null;

    @ApiModelProperty(name="응답 코드", example="200")
    Integer statusCode = null;

    @ApiModelProperty(name ="http status code",example = "200")
    HttpStatus httpStatus;

    public BaseResponse() {}



    public BaseResponse(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public BaseResponse(Integer statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }public BaseResponse(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }

    public static BaseResponse of(Integer statusCode, String message) {
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.statusCode = statusCode;
        baseResponse.message = message;
        return baseResponse;
    }
    public static BaseResponse of(HttpStatus httpStatus, String message) {
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.httpStatus = httpStatus;
        baseResponse.message = message;
        return baseResponse;
    }
}