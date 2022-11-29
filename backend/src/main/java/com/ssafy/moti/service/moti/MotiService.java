package com.ssafy.moti.service.moti;

import com.ssafy.moti.dto.response.moti.*;

import java.util.List;

public interface MotiService {
    public void createMoti(String motiName,Long userNo)throws IllegalStateException,IllegalAccessException;
    public MotiAllInfoResponse getAllMotiInfo(Long userNo)throws IllegalStateException,IllegalAccessException;

    public MotiRankListResponse getRanking(String userName)throws IllegalStateException,IllegalAccessException;
    public int playingMoti(Long userNo)throws IllegalStateException,IllegalAccessException;
    public int cleaningMoti(Long userNo)throws IllegalStateException,IllegalAccessException;

    public MotiFeedResponseResponse feedMoti(Long userNo, String userName)throws IllegalStateException,IllegalAccessException;

    public List<DeadMotiResponse> deadMotiList(Long userNo)throws IllegalStateException,IllegalAccessException;

    public boolean checkFedToday(Long userNo)throws IllegalStateException,IllegalAccessException;
}
