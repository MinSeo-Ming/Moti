package com.ssafy.moti.entity.deleteuser;

import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString

@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"userName"})
        },
        schema = "delete_user"
)
// TODO : User와 DeleteUser는 사실상 같은 엔티티이다. 좀 더 유연하게 변경해보자.
public class DeleteUser {
    @Id
    private Long userNo;

    private String userName;

    @JsonIgnore
    private String password;

    private String deleteDate;
}
