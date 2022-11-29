package com.ssafy.moti.service.user;

import com.ssafy.moti.dto.UserThemeDto;
import com.ssafy.moti.entity.dev.user.User;
import com.ssafy.moti.entity.dev.user.UserTheme;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface UserService {

    void saveUserTheme(Long userNo, UserThemeDto userColorDto);

    UserTheme getUserTheme(Long userNo);

    void deleteUser(Long userNo);

    void restoreUser(Long userNo);

    Optional<User> findUserFromDev(String userName);

    Optional<User> findByUserNo(Long userNo);
}
