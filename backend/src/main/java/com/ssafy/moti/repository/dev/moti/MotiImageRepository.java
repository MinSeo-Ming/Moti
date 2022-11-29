package com.ssafy.moti.repository.dev.moti;

import com.ssafy.moti.entity.dev.moti.MotiCatalog;
import com.ssafy.moti.entity.dev.moti.MotiImg;
import com.ssafy.moti.entity.dev.moti.MotiImgId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MotiImageRepository extends JpaRepository<MotiImg, MotiImgId> {
    List<MotiImg> findAllByMotiCatalog(MotiCatalog catalog);
}
