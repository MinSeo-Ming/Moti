package com.ssafy.moti.repository.sub;

import com.ssafy.moti.entity.sub.Repos;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReposRepository extends MongoRepository<Repos,String> {
    Repos findByName(String name);

    boolean existsByName(String name);

    void removeByName(String name);
}
