package com.ssafy.moti.service.sub;

import com.ssafy.moti.entity.sub.Repos;

public interface ReposService {
    Repos findByName(String name);

    boolean existsByName(String name);

    void removeByName(String name);

    void save(Repos repos);
}
