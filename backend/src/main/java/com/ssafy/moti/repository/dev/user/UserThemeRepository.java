package com.ssafy.moti.repository.dev.user;

import com.ssafy.moti.entity.dev.user.User;
import com.ssafy.moti.entity.dev.user.UserTheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserThemeRepository extends JpaRepository<UserTheme, Long> {
    UserTheme getUserThemeByUser_UserNo(Long userNo);

    UserTheme getUserThemeByUser(User user);
}
