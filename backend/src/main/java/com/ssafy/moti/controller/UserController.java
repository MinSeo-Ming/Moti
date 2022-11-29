package com.ssafy.moti.controller;

import com.ssafy.moti.common.auth.UserPrincipal;
import com.ssafy.moti.dto.UserThemeDto;
import com.ssafy.moti.dto.request.user.UpdateMyReposRequest;
import com.ssafy.moti.dto.response.user.UserNameResponse;
import com.ssafy.moti.entity.dev.user.User;
import com.ssafy.moti.entity.dev.user.UserTheme;
import com.ssafy.moti.entity.sub.Repos;
import com.ssafy.moti.service.sub.ReposService;
import com.ssafy.moti.service.user.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private ReposService reposService;

    @Autowired
    private UserService userService;

    @ApiOperation(value = "모티 밥그릇 생성/수정")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공")
    })
    @PutMapping ("/my-repositories")
    public ResponseEntity<?> updateMyRepos(
            @ApiIgnore Authentication authentication,
            @RequestBody UpdateMyReposRequest updateMyReposRequest
    ) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        if(reposService.existsByName(userPrincipal.getUsername())) {
            Repos userRepos = reposService.findByName(userPrincipal.getUsername());
            userRepos.setRepoList(updateMyReposRequest.getRepos());
            reposService.save(userRepos);
        } else {
            reposService.save(Repos.builder()
                    .name(userPrincipal.getUsername())
                    .repoList(updateMyReposRequest.getRepos())
                    .build()
            );
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation(value = "모티 밥그릇 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "204", description = "밥그릇이 존재하지 않습니다")
    })
    @GetMapping("/my-repositories")
    public ResponseEntity<?> getMyRepositories(
            @ApiIgnore Authentication authentication
    ) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        if(reposService.existsByName(userPrincipal.getUsername())) {
            List<String> userRepos = reposService.findByName(userPrincipal.getUsername()).getRepoList();
            return ResponseEntity.status(HttpStatus.OK).body(userRepos);
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("밥그릇이 존재하지 않습니다");
        }
    }

    @ApiOperation(value = "사용자 설정 색상 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "조회 성공")
    })
    @GetMapping("/color")
    public ResponseEntity<?> getUserTheme(
            @ApiIgnore Authentication authentication
    ) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        UserTheme userTheme = userService.getUserTheme(userPrincipal.getId());
        UserThemeDto result = UserThemeDto.builder()
                .buttonColor(userTheme.getButtonColor())
                .deviceColor(userTheme.getDeviceColor())
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "사용자 설정 색상 수정")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "수정 성공")
    })
    @PutMapping("/color")
    public ResponseEntity<?> updateUserTheme(
            @ApiIgnore Authentication authentication,
            @RequestBody UserThemeDto userThemeDto
    ) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        userService.saveUserTheme(userPrincipal.getId(), userThemeDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation(value = "회원 탈퇴. 28일의 유예기간을 갖는다.")
    @DeleteMapping("")
    @Transactional
    public ResponseEntity<?> deleteUser(
            @ApiIgnore Authentication authentication
    ) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        userService.deleteUser(userPrincipal.getId());
        reposService.removeByName(userPrincipal.getUsername());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation(value = "사용자 이름 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "사용자 정보 조회"),
            @ApiResponse(responseCode = "404", description = "사용자가 존재하지 않습니다")
    })
    @GetMapping("/my-account")
    public ResponseEntity<?> getUserName(
            @ApiIgnore Authentication authentication
    ) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Optional<User> userInfo = userService.findByUserNo(userPrincipal.getId());
        if(userInfo.isPresent()) {
            UserNameResponse userNameResponse = new UserNameResponse(userInfo.get().getUserName());
            return ResponseEntity.status(HttpStatus.OK).body(userNameResponse);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
