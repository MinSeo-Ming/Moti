package com.ssafy.moti.service.auth;

import com.ssafy.moti.common.enums.AuthProvider;
import com.ssafy.moti.entity.deleteuser.DeleteUser;
import com.ssafy.moti.entity.dev.user.User;
import com.ssafy.moti.entity.dev.user.UserAccount;
import org.kohsuke.github.GHMyself;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public interface AuthService {

    GHMyself getUserInfoFromGitHub(String accessToken) throws IOException;

    void save(UserAccount userAccount);

    Optional<UserAccount> findByUserAndProvider(User userNo, AuthProvider provider);

    Optional<DeleteUser> findUserFromDelete(String userName);

    User initUserWith(GHMyself githubUser, String accessToken) throws IOException;

    String authenticate(User user);
}
