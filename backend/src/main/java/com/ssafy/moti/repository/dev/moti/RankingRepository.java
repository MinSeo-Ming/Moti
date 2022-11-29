package com.ssafy.moti.repository.dev.moti;

import com.ssafy.moti.entity.dev.moti.Ranking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RankingRepository extends JpaRepository<Ranking,Long> {
    boolean existsRankingByUserName(String userName);
    Ranking findByUserName(String userName);
    List<Ranking> findTop100ByOrderByRankAsc();
}
