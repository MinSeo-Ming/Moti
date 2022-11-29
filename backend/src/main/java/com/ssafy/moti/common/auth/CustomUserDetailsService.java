package com.ssafy.moti.common.auth;

import com.ssafy.moti.entity.dev.user.User;
import com.ssafy.moti.repository.dev.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(userName).orElseThrow(
                () -> new UsernameNotFoundException("User not found with name : "+userName)
        );

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserByUserNo(Long userNo) {
        User user = userRepository.findById(userNo).orElseThrow(
                () -> new UsernameNotFoundException("User not found with user_no :"+userNo)
        );

        return UserPrincipal.create(user);
    }

}
