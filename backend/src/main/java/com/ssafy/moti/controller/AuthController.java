package com.ssafy.moti.controller;

import com.ssafy.moti.common.enums.AuthProvider;
import com.ssafy.moti.dto.request.auth.GitOAuthRequest;
import com.ssafy.moti.dto.response.auth.AuthResponse;
import com.ssafy.moti.entity.deleteuser.DeleteUser;
import com.ssafy.moti.entity.dev.user.User;
import com.ssafy.moti.entity.dev.user.UserAccount;
import com.ssafy.moti.service.auth.AuthService;
import com.ssafy.moti.service.user.UserService;
import io.swagger.annotations.ApiOperation;
import com.ssafy.moti.service.item.ItemService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.kohsuke.github.GHMyself;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @ApiOperation(value = "Github OAuth 회원 인증")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "회원 인증 성공"),
            @ApiResponse(responseCode = "400", description = "회원 인증 실패, github access 토큰을 다시 확인해주세요")
    })
    @PostMapping("/github")
    public ResponseEntity<?> authenticateUser(@RequestBody GitOAuthRequest gitOAuthRequest) {
        try {
            // oAuthToken 통해서 github 사용자 정보 조회
            GHMyself userInfoFromGitHub = authService.getUserInfoFromGitHub(gitOAuthRequest.getAccessToken());

            // github 사용자 정보를 통해 DB 사용자 정보 조회
            // DB 사용자 정보는 깃 닉네임으로 검색. 깃 닉네임이 바뀌면 계정 분실임.
            Optional<User> userInfoFromDev = userService.findUserFromDev(userInfoFromGitHub.getLogin());

            if(userInfoFromDev.isEmpty()) { // DB 사용자 정보 없으면 삭제된 사용자인지 확인
                Optional<DeleteUser> deleteUser = authService.findUserFromDelete(userInfoFromGitHub.getLogin());
                if(deleteUser.isPresent()) { // 삭제된 사용자라면 -> 복구 -> JWT 토큰 반환
                    userService.restoreUser(deleteUser.get().getUserNo());

                    String jwtToken = authService.authenticate(new User(
                            deleteUser.get().getUserNo(),
                            deleteUser.get().getUserName(),
                            deleteUser.get().getPassword()
                    ));
                    return ResponseEntity.status(HttpStatus.OK).body(new AuthResponse(jwtToken));
                } else { // 삭제된 사용자가 아니라면 -> DB에 사용자 정보 추가 (회원가입) -> JWT 토큰 반환
                    User saved = authService.initUserWith(userInfoFromGitHub, gitOAuthRequest.getAccessToken());

                    String jwtToken = authService.authenticate(saved);
                    return ResponseEntity.status(HttpStatus.OK).body(new AuthResponse(jwtToken));
                }
            } else { // DB 사용자 정보 있으면 -> git token 갱신 -> JWT 토큰 반환 (로그인)
                String jwtToken = authService.authenticate(userInfoFromDev.get());
                UserAccount userAccount = authService.findByUserAndProvider(userInfoFromDev.get(), AuthProvider.GITHUB).orElseThrow(IOException::new);

                userAccount.setProviderID(gitOAuthRequest.getAccessToken());
                authService.save(userAccount);

                return ResponseEntity.status(HttpStatus.OK).body(new AuthResponse(jwtToken));
            }
        } catch(IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to connect with GitHub");
        }
   }
}
