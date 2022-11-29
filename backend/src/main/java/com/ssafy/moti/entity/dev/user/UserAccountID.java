package com.ssafy.moti.entity.dev.user;

import com.ssafy.moti.common.enums.AuthProvider;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserAccountID implements Serializable {

    private Long user;
    private AuthProvider provider;
}
