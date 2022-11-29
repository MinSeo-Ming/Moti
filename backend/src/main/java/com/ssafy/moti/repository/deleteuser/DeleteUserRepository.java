package com.ssafy.moti.repository.deleteuser;

import com.ssafy.moti.entity.deleteuser.DeleteUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeleteUserRepository extends JpaRepository<DeleteUser, Long> {
    Optional<DeleteUser> findByUserName(String userName);
}
