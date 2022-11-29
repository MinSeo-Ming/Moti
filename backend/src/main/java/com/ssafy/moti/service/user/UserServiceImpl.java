package com.ssafy.moti.service.user;

import com.ssafy.moti.dto.UserThemeDto;
import com.ssafy.moti.entity.dev.user.User;
import com.ssafy.moti.entity.dev.user.UserTheme;
import com.ssafy.moti.entity.log.UserDeleteLog;
import com.ssafy.moti.entity.log.UserRestoreLog;
import com.ssafy.moti.repository.dev.user.UserRepository;
import com.ssafy.moti.repository.dev.user.UserThemeRepository;
import com.ssafy.moti.repository.log.UserDeleteLogRepository;
import com.ssafy.moti.repository.log.UserRestoreLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserThemeRepository userThemeRepository;

    @Autowired
    UserDeleteLogRepository userDeleteLogRepository;

    @Autowired
    UserRestoreLogRepository userRestoreLogRepository;

    @Override
    public void saveUserTheme(Long userNo, UserThemeDto userColorDto) {
        UserTheme userTheme = userThemeRepository.getUserThemeByUser_UserNo(userNo);

        userTheme.setButtonColor(userColorDto.getButtonColor());
        userTheme.setDeviceColor(userColorDto.getDeviceColor());

        userThemeRepository.save(userTheme);
    }

    @Override
    public UserTheme getUserTheme(Long userNo) {
        return userThemeRepository.getUserThemeByUser_UserNo(userNo);
    }

    @Override
    public void deleteUser(Long userNo) {
        LocalDate movedDate = LocalDate.now();
        LocalDate deleteDate = movedDate.plusDays(28);

        userDeleteLogRepository.save(UserDeleteLog.builder()
                .userNo(userNo)
                .movedDate(movedDate.toString())
                .deleteDate(deleteDate.toString())
                .build()
        );
    }

    @Override
    public void restoreUser(Long userNo) {
        LocalDate restoreDate = LocalDate.now();

        userRestoreLogRepository.save(
                UserRestoreLog.builder()
                .userNo(userNo)
                .restoreDate(restoreDate.toString())
                .build()
        );
    }

    @Override
    public Optional<User> findUserFromDev(String userName) {
        return userRepository.findByUserName(userName);
    }

    @Override
    public Optional<User> findByUserNo(Long userNo) {
        return userRepository.findByUserNo(userNo);
    }
}
