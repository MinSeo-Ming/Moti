package com.ssafy.moti.repository.dev.moti;

import com.ssafy.moti.common.enums.LevelType;
import com.ssafy.moti.common.enums.MotiType;
import com.ssafy.moti.entity.dev.moti.MotiCatalog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MotiCatalogRepository  extends JpaRepository<MotiCatalog,Long> {
    MotiCatalog findByMotiCatalogNo(Long catalogNo);
    boolean existsByMotiCatalogNo(Long catalogNo);

    List<MotiCatalog> findAllByMotiLevel(LevelType level);

    MotiCatalog findByMotiTypeAndMotiLevel(MotiType motiType, LevelType motiLevel);
}
