package com.ssafy.moti.service.sub;

import com.ssafy.moti.entity.sub.Repos;
import com.ssafy.moti.repository.sub.ReposRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReposServiceImpl implements ReposService {

    @Autowired
    ReposRepository reposRepository;

    @Override
    public Repos findByName(String name) {
        return reposRepository.findByName(name);
    }

    @Override
    public boolean existsByName(String name) {
        return reposRepository.existsByName(name);
    }

    @Override
    public void removeByName(String name) {
        reposRepository.removeByName(name);
    }

    @Override
    public void save(Repos repos) {
        reposRepository.save(repos);
    }
}
