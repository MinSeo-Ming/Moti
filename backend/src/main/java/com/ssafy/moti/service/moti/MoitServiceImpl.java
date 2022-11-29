package com.ssafy.moti.service.moti;

import com.ssafy.moti.common.enums.*;
import com.ssafy.moti.dto.response.gitCommitResponse;
import com.ssafy.moti.dto.response.moti.*;
import com.ssafy.moti.entity.dev.moti.*;
import com.ssafy.moti.entity.dev.user.User;
import com.ssafy.moti.entity.dev.user.UserAccount;
import com.ssafy.moti.entity.log.MotiCleanLog;
import com.ssafy.moti.entity.log.MotiClosenessLog;
import com.ssafy.moti.entity.log.MotiFeedLog;
import com.ssafy.moti.entity.log.UserGoodsLog;
import com.ssafy.moti.entity.sub.Repos;
import com.ssafy.moti.repository.dev.moti.*;
import com.ssafy.moti.repository.dev.user.UserAccountRepository;
import com.ssafy.moti.repository.dev.user.UserGoodsRepository;
import com.ssafy.moti.repository.dev.user.UserRepository;
import com.ssafy.moti.repository.log.MotiCleanLogRepository;
import com.ssafy.moti.repository.log.MotiClosenessLogRepository;
import com.ssafy.moti.repository.log.MotiFeedLogRepository;
import com.ssafy.moti.repository.log.UserGoodsLogRepository;
import com.ssafy.moti.repository.sub.ReposRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@Service
@Transactional
public class MoitServiceImpl implements MotiService {

    //날짜 포멧팅
    SimpleDateFormat simpleTimeFormat = new SimpleDateFormat("yyyy-MM-dd&HH:mm:ss");
    DateTimeFormatter seoulZoneTimeFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd&HH:mm:ss");

    //moti info repo
    @Autowired
    UserMotiInfoRepository motiInfoRepository;
    //moti status repo
    @Autowired
    UserMotiStatusRepository motiStatusRepository;
    //user repo
    @Autowired
    UserRepository userRepository;
    //moti catalog repo
    @Autowired
    MotiCatalogRepository motiCatalogRepository;
    //moti image repo
    @Autowired
    MotiImageRepository motiImageRepository;
    //moti rank
    @Autowired
    RankingRepository rankingRepository;
    //dead moti
    @Autowired
    DeadMotiRepository deadMotiRepository;
    //user's selected repoList
    @Autowired
    ReposRepository reposRepository;
    @Autowired
    UserAccountRepository userAccountRepository;
    @Autowired
    UserGoodsLogRepository userGoodsLogRepository;
    @Autowired
    MotiFeedLogRepository motiFeedLogRepository;
    @Autowired
    MotiClosenessLogRepository motiClosenessLogRepository;

//    @Autowired
//    TemporaryRankingRepository temporaryRankingRepository;
    @Autowired
    MotiCleanLogRepository motiCleanLogRepository;

    @Autowired
    UserGoodsRepository userGoodsRepository;

    //각각은 밥먹이기 상한선과 애정도 상한선
    static final int FEED_LIMIT = 3;
    static final int CLOSENESS_LIMIT = 5;

    /**
     * @param name
     * @param userNo
     * @return
     */
    @Override
    @Transactional
    public void createMoti(String name, Long userNo) throws IllegalStateException, IllegalAccessException {

        User user = userRepository.findByUserNo(userNo)
                .orElse(null);
        if (user == null) {
            throw new IllegalAccessException();
        }

        boolean newCreateInfo = motiInfoRepository.existsUserMotiInfoById(userNo);
        boolean newCreateStatus = motiStatusRepository.existsUserMotiStatusById(userNo);

        //이미 존재하면 생성 할 수 없음
        if (newCreateInfo || newCreateStatus) {
            throw new IllegalStateException("이미 모티가 존재함");
        }
        int nameLength = name.length();
        if(nameLength>8||nameLength<2||name.contains(" ")){
            throw new IllegalStateException("이름이 너무 길거나 짧거나 띄어쓰기가 포함되어 있습니다.");
        }


        // 모티 카탈로그 중 레벨이 0인 애들 찾기
        List<MotiCatalog> catalogList = motiCatalogRepository.findAllByMotiLevel(LevelType.ZERO);

        //모티 생성날짜
        ZonedDateTime today= ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        String[] todayFormat = today.format(seoulZoneTimeFormat).split("&");

        //모티 성별 및 타입 랜덤 설정
        int typeLength = catalogList.size();
        int catalogNo = new Random().nextInt(typeLength);
        MotiCatalog catalog = catalogList.get(catalogNo);

        int sex = new Random().nextInt(2) + 1;
        String gender;
        if (sex == 1) {
            gender = "male";
        } else {
            gender = "female";
        }
        motiInfoRepository.save(
                UserMotiInfo.builder()
                        .user(user).motiCatalog(catalog)
                        .motiGender(gender).motiName(name)
                        .motiBirth(todayFormat[0]).build()
        );

        motiStatusRepository.save(
                UserMotiStatus.builder()
                        .user(user).liveDays(0L)
                        .closeness(0L).survivalDays(0L)
                        .latestCleanDate(todayFormat[0]).latestFeedDate(todayFormat[0])
                        .latestFeedTime("00:00:00").build()
        );


    }

    /**
     * @param userNo
     * @return
     */
    @Override
    @Transactional
    public MotiAllInfoResponse getAllMotiInfo(Long userNo) throws IllegalStateException, IllegalAccessException {
        User user = userRepository.findByUserNo(userNo)
                .orElse(null);
        if (user == null) {
            throw new IllegalAccessException();
        }

        boolean newCreateInfo = motiInfoRepository.existsUserMotiInfoById(userNo);
        boolean newCreateStatus = motiStatusRepository.existsUserMotiStatusById(userNo);

        //모티가 존재하지 않으면 정보를 반환할 수 없음
        if (newCreateInfo == false || newCreateStatus == false) {
            throw new IllegalStateException("모티 정보가 없음");
        }

        UserMotiInfo motiInfo = motiInfoRepository.findByUser(user);
        UserMotiStatus motiStatus = motiStatusRepository.findByUser(user);
        MotiCatalog motiCatalog = motiInfo.getMotiCatalog();
        List<MotiImg> motiImgList = motiImageRepository.findAllByMotiCatalog(motiCatalog);

        //이미지 타입에 맞게 반환
        MotiImgListResponse imgList = new MotiImgListResponse();
        motiImgList.forEach(img -> {
            if (img.getMotiCode().equals(MotiStatusType.DEFAULT)) {
                imgList.setDefaultImg(img.getMotiImg());
            } else if (img.getMotiCode().equals(MotiStatusType.HUNGRY)) {
                imgList.setHungryImg(img.getMotiImg());
            } else if (img.getMotiCode().equals(MotiStatusType.EATING)) {
                imgList.setEatingImg(img.getMotiImg());
            } else if (img.getMotiCode().equals(MotiStatusType.PLAYING)) {
                imgList.setPlayingImg(img.getMotiImg());
            } else if (img.getMotiCode().equals(MotiStatusType.SHOWER)) {
                imgList.setShowerImg(img.getMotiImg());
            }
        });

        return MotiAllInfoResponse.builder()
                .lastFeedDay(motiStatus.getLatestFeedDate())
                .liveDays(motiStatus.getLiveDays())
                .closeness(motiStatus.getCloseness())
                .motiImgList(imgList)
                .motiName(motiInfo.getMotiName())
                .motiLevel(motiCatalog.getMotiLevel().toString())
                .motiBirth(motiInfo.getMotiBirth())
                .motiGender(motiInfo.getMotiGender())
                .build();
    }


    /**
     * @return
     */
    @Override
    @Transactional
    public MotiRankListResponse getRanking(String userName) throws IllegalStateException, IllegalAccessException {
        User user = userRepository.findByUserName(userName).orElse(null);
        if (user == null) {
            throw new IllegalAccessException();
        }

        boolean newCreateInfo = motiInfoRepository.existsUserMotiInfoById(user.getUserNo());
        boolean newCreateStatus = motiStatusRepository.existsUserMotiStatusById(user.getUserNo());

        //모티가 존재하지 않으면 정보를 반환할 수 없음
        if (!newCreateInfo || !newCreateStatus) {
            throw new IllegalStateException("모티 정보가 없음");
        }

        //ranking 테이블이 존재하는 지 확인 -> 이유 : 랭킹을 갱신할때 랭킹 테이블을 비우기때문에
        boolean checkTableEmpty = false;
        List<Ranking> rankingList = null;
        List<Ranking> temp = null;
        Ranking myRanking = null;
        rankingList = rankingRepository.findTop100ByOrderByRankAsc();

//        if (rankingList.size() == 0) {
//            checkTableEmpty = true;
//        }

        UserMotiInfo motiInfo = motiInfoRepository.findByUser(user);



            if (!rankingRepository.existsRankingByUserName(userName)) {
                myRanking = Ranking.builder()
                        .closeness(0L)
                        .userName(userName)
                        .liveDays(0L)
                        .rank(999L)
                        .motiName(motiInfo.getMotiName())
                        .motiImg(motiImageRepository.findAllByMotiCatalog(
                                motiInfo.getMotiCatalog()).get(0).getMotiImg())
                        .build();
            } else {
                myRanking = rankingRepository.findByUserName(userName);
            }


        return MotiRankListResponse.builder()
                .myRanking(myRanking)
                .rankings(rankingList)
                .build();
    }

    /**
     * @param userNo
     * @return
     */
    @Override
    @Transactional
    public int playingMoti(Long userNo) throws IllegalStateException, IllegalAccessException {
        if (!userRepository.existsById(userNo)) { //유저가 존재하지 않으면 접근 금지
            throw new IllegalAccessException();
        }

        boolean newCreateInfo = motiInfoRepository.existsUserMotiInfoById(userNo);
        boolean newCreateStatus = motiStatusRepository.existsUserMotiStatusById(userNo);

        //모티가 존재하지 않으면 정보를 반환할 수 없음
        if (!newCreateInfo || !newCreateStatus) {
            throw new IllegalStateException("모티 정보가 없음");
        }

        ZonedDateTime today= ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        String[] todayFormat = today.format(seoulZoneTimeFormat).split("&");

        List<MotiClosenessLog> motiClosenessLogList = motiClosenessLogRepository.findAllByTimerDateAndUserNo(todayFormat[0], userNo);

        int logSize = motiClosenessLogList.size();
        //오늘 애정도가 쌓인 적이 있다면
        if (logSize > 0) {
            Long lastCloseness = motiClosenessLogList.get(logSize - 1).getClosenessAfterEvent();
            Long atferCloseness = lastCloseness +5L;
            //상한선에 도달하명
            if (motiClosenessLogList.size() >= CLOSENESS_LIMIT) {
                return 0;
            } else {
                if(atferCloseness >100L) atferCloseness=100L;
                motiClosenessLogRepository.save(
                        MotiClosenessLog.builder()
                                .closenessAfterEvent(atferCloseness)
                                .closenessBeforeEvent(lastCloseness)
                                .userNo(userNo)
                                .timerDate(todayFormat[0])
                                .timerTime(todayFormat[1])
                                .build()
                );
                return 1;
            }
        } else {
            User user = userRepository.findByUserNo(userNo).orElse(null);
            //이전 애정도를 알기위해서
            Long closeness = motiStatusRepository.findByUser(user).getCloseness();
            Long atferCloseness = closeness +5L;
            if(atferCloseness >100L) atferCloseness=100L;
            motiClosenessLogRepository.save(

                    MotiClosenessLog.builder()
                            .closenessAfterEvent(atferCloseness)
                            .closenessBeforeEvent(closeness)
                            .userNo(userNo)
                            .timerDate(todayFormat[0])
                            .timerTime(todayFormat[1])
                            .build()
            );
            return 1;
        }

    }

    /**
     * @param userNo
     * @return
     */
    @Override
    @Transactional
    public int cleaningMoti(Long userNo) throws IllegalStateException, IllegalAccessException {
        if (!userRepository.existsById(userNo)) { //유저가 존재하지 않으면 접근 금지
            throw new IllegalAccessException();
        }

        boolean newCreateInfo = motiInfoRepository.existsUserMotiInfoById(userNo);
        boolean newCreateStatus = motiStatusRepository.existsUserMotiStatusById(userNo);

        //모티가 존재하지 않으면 정보를 반환할 수 없음
        if (!newCreateInfo || !newCreateStatus) {
            throw new IllegalStateException("모티 정보가 없음");
        }

        String today[] = simpleTimeFormat.format(new Date()).split("&");
        List<MotiClosenessLog> motiClosenessLogList = motiClosenessLogRepository.findAllByTimerDateAndUserNo(today[0], userNo);

        int logSize = motiClosenessLogList.size();
        if (logSize > 0) {
            Long lastCloseness = motiClosenessLogList.get(logSize - 1).getClosenessAfterEvent();
            Long atferCloseness = lastCloseness +5L;
            if (motiClosenessLogList.size() >= CLOSENESS_LIMIT) {
                return 0;
            } else {
                if(atferCloseness>100L) atferCloseness =100L;
                motiClosenessLogRepository.save(
                        MotiClosenessLog.builder()
                                .closenessAfterEvent(atferCloseness)
                                .closenessBeforeEvent(lastCloseness)
                                .userNo(userNo)
                                .timerDate(today[0])
                                .timerTime(today[1])
                                .build()
                );
                motiCleanLogRepository.save(
                        MotiCleanLog.builder()
                                .userNo(userNo)
                                .timerDate(today[0])
                                .timerTime(today[1])
                                .build()
                );

                return 1;
            }
        } else {
            User user = userRepository.findByUserNo(userNo).orElse(null);
            Long closeness = motiStatusRepository.findByUser(user).getCloseness();
            Long atferCloseness = closeness +5L;
            if(atferCloseness >100L) atferCloseness= 100L;
            motiClosenessLogRepository.save(

                    MotiClosenessLog.builder()
                            .closenessAfterEvent(atferCloseness)
                            .closenessBeforeEvent(closeness)
                            .userNo(userNo)
                            .timerDate(today[0])
                            .timerTime(today[1])
                            .build()
            );
            motiCleanLogRepository.save(
                    MotiCleanLog.builder()
                            .userNo(userNo)
                            .timerDate(today[0])
                            .timerTime(today[1])
                            .build()
            );
            return 1;
        }

    }

    /**
     * @param userNo
     * @return
     */
    @Override
    @Transactional
    public MotiFeedResponseResponse feedMoti(Long userNo, String userName) throws IllegalStateException, IllegalAccessException {
        if (!userRepository.existsById(userNo)) { //유저가 존재하지 않으면 null
            throw new IllegalAccessException();
        }
        if (!motiStatusRepository.existsById(userNo)) { //모티 없으면 null
            throw new IllegalStateException("모티 정보가 없음");
        }
        //그리니치 천문관 시각
        ZonedDateTime nowSeoul = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        ZonedDateTime nowUTC =nowSeoul.withZoneSameInstant(ZoneOffset.UTC);


        //오늘 서울 날짜 & 시각
        String todaySeoulTime[] = nowSeoul.format(seoulZoneTimeFormat).split("&");

        User user = userRepository.findByUserNo(userNo).orElse(null);
        //모티 상태 가져오기
        UserMotiStatus status = motiStatusRepository.findByUser(user);
        // 마지막으로 밥먹인 시각
        String feedDate = status.getLatestFeedDate();
        String feedTime = status.getLatestFeedTime();

        String motiLastFeedDateString = status.getLatestFeedDate().concat("&").concat(status.getLatestFeedTime());
        ZonedDateTime motiLastFeedDateSeoul = ZonedDateTime.of(LocalDateTime.parse(motiLastFeedDateString,seoulZoneTimeFormat),ZoneId.of("Asia/Seoul"));
        ZonedDateTime motiLastFeedUTC = motiLastFeedDateSeoul.withZoneSameInstant(ZoneOffset.UTC);

        String beforeFormat = "";
        if (feedDate.equals(todaySeoulTime[0])) { //서울 시각으로 가장 최신에 밥을 먹인 날짜와  현재 날짜가 같은 경우에만..
            beforeFormat = motiLastFeedUTC.toString(); //오늘 날짜 포멧
        } else {
            String yesterday = nowSeoul.minus(Period.ofDays(1)).format(seoulZoneTimeFormat).split("&")[0];
            beforeFormat = yesterday.concat("T15:00:00Z");
        }


        if (!reposRepository.existsByName(userName)) { //유저 이름으로 찾았을때 밥그롯이 존재하는지
            log.debug("레포 존재 유무 "+reposRepository.existsByName(userName));
            throw new IllegalStateException("밥그릇 없음");
        }

        UserAccount account = userAccountRepository.findByUserAndProvider(user, AuthProvider.GITHUB).orElse(null);
        if (account == null) {
            throw new IllegalStateException("git token 없음");
        }
        String gitHubToken = account.getProviderID(); //github 에서 토큰 가져오기 위해서

        Repos repos = reposRepository.findByName(userName); //밥그롯들 가져오기
        List<String> repoList = repos.getRepoList();
        if (repoList.size() == 0) {
            log.debug("레포 사이즈 "+ repoList.size());
            log.debug("레포 내용"+ repoList.toString());
            throw new IllegalStateException("밥그릇에 하나도 repo가 없음");
        }

        int removeRepos = 0;
        int gitCommitCount = 0; // 총 커밋한 수
        Mono<List<gitCommitResponse>> data;
        List<String> updateRepos = new ArrayList<>(); //update할 레포들
        for (String repoName : repoList) { //레포 별로 조회해오기
            String url = "https://api.github.com/repos/" + userName + "/" + repoName + "/commits?since=" + beforeFormat + "&until=" + nowUTC;
            try {
                data = WebClient
                        .create(url)
                        .get()
                        .header("Authorization", "Bearer " + gitHubToken)
                        .retrieve()
                        .bodyToMono(new ParameterizedTypeReference<List<gitCommitResponse>>() {
                        });
                List<gitCommitResponse> readers = data.block();
                gitCommitCount += readers.size(); // 밥을 줄수 있는 횟수
                updateRepos.add(repoName); // git에 존재하는 repo들
            } catch (WebClientResponseException e) {
                removeRepos++;
                e.printStackTrace();
            }

        }

        //mongodb에서 레포 삭제... 정확힌 update
        if (removeRepos > 0) {
            repos.setRepoList(updateRepos);
            reposRepository.save(repos);
        }

        // 줄수 있는 coin 갯수 세기...
        List<UserGoodsLog> userGoodsLogList = userGoodsLogRepository.findByTimerDateAndGoodsTypeAndEventTypeAndUserNo(todaySeoulTime[0], GoodsType.COIN, EventType.FEED,userNo);
        Long coinBefore = 0L;
        Long coinAfter = 0L;
        int coinDiff = 0; // 밥먹이기로 줄 수 있는 코인 갯수
        log.debug("오늘 얻은 로그수 : "+ String.valueOf(userGoodsLogList.size()));
        if (userGoodsLogList.size() != 0) { //오늘 로그가 있는 경우
            coinBefore = userGoodsLogList.get(0).getCountBeforeEvent();
            log.debug("오늘 얻은 첫 코인수 : "+ coinBefore);
            int goodsLogSize = userGoodsLogList.size();
            if (goodsLogSize > 1) { //오늘 로그 가 2개 이상인경우
                coinAfter = userGoodsLogList.get(goodsLogSize - 1).getCountAfterEvent();
            } else {// 오늘 로그가 1개인 경우
                coinAfter = userGoodsLogList.get(0).getCountAfterEvent();
            }
            log.debug("오늘 얻은 마지막 코인수 : "+ coinAfter);

            coinDiff = FEED_LIMIT - (int) (coinAfter - coinBefore); // 밥 줄 수 있는 최대 리밋
            if (coinDiff < 0) { //만약 마아아안약에 마이너스가 나오게 되는 경우
                coinDiff = 0;
            }
        } else {// 오늘 로그가 없는 경우
            coinDiff = FEED_LIMIT;
        }
        log.debug(" 코인 얻은거ㅓㅓㅓ :"+String.valueOf(coinDiff));

        int tokenCount = Math.min(coinDiff, gitCommitCount); //밥을 줄수 있는 횟수와 커밋수 비교하기
        log.debug(" 얻은 토큰 :"+String.valueOf(tokenCount));
        Long tokenLong = Long.valueOf(tokenCount);

        Long userBeforeCoin = userGoodsRepository.findByUser_UserNoAndGoodsType(userNo, GoodsType.COIN).getGoodsCount();


        if (gitCommitCount == 0) {
            throw new IllegalStateException("commit 없음");
        } else if (updateRepos.size() != repoList.size()) {
            throw new IllegalStateException("repo 전체 삭제");
        } else {

            //로그 작성해야함.. -> 코인... 1이상일경우만...
            //                 -> feed는 무슨일이 있어도..? gitCommitCount가 0이상이면 항상...

            if (tokenCount >= 1) {
                userGoodsLogRepository.save(
                        UserGoodsLog.builder()
                                .goodsType(GoodsType.COIN)
                                .userNo(userNo).countBeforeEvent(userBeforeCoin)
                                .countAfterEvent(userBeforeCoin + tokenLong)
                                .timerDate(todaySeoulTime[0])
                                .timerTime(todaySeoulTime[1])
                                .eventType(EventType.FEED).build()
                );
            }
            motiFeedLogRepository.save(
                    MotiFeedLog.builder()
                            .timerDate(todaySeoulTime[0])
                            .timerTime(todaySeoulTime[1])
                            .userNo(userNo)
                            .feedCode(FeedType.GIT)
                            .build()
            );

            return MotiFeedResponseResponse.builder().tokens(tokenLong).build();
        }
    }

    /**
     * @param userNo
     * @return
     */
    @Override
    @Transactional
    public List<DeadMotiResponse> deadMotiList(Long userNo) throws IllegalStateException, IllegalAccessException {
        if (!userRepository.existsById(userNo)) { //유저가 존재하지 않으면 null
            throw new IllegalAccessException();
        }
        User user = userRepository.findByUserNo(userNo)
                .orElse(null);

        List<DeadMoti> deadMotiList = deadMotiRepository.findAllByUser(user);
        List<DeadMotiResponse> deadMotiResponseList = new ArrayList<>();
        if (deadMotiList.size() > 0) {
            for (DeadMoti deadMoti : deadMotiList) {
                deadMotiResponseList.add(
                        DeadMotiResponse.builder()
                                .deadMotiNo(deadMoti.getDeadMotiNo())
                                .motiBirth(deadMoti.getMotiBirth())
                                .motiGender(deadMoti.getMotiGender())
                                .motiName(deadMoti.getMotiName())
                                .motiDeath(deadMoti.getMotiDeath())
                                .motiUrl(motiImageRepository.findAllByMotiCatalog(deadMoti.getMotiCatalog()).get(0).getMotiImg())
                                .build()
                );
            }
        }

        return deadMotiResponseList;
    }

    /**
     * @param userNo
     * @return
     */
    @Override
    @Transactional
    public boolean checkFedToday(Long userNo) throws IllegalStateException, IllegalAccessException {
        if (!userRepository.existsById(userNo)) { //유저가 존재하지 않으면 null
            throw new IllegalAccessException();
        }
        if (!motiStatusRepository.existsById(userNo)) { //모티 없으면 null
            throw new IllegalStateException();
        }
        User user = userRepository.findByUserNo(userNo)
                .orElse(null);
        String today = simpleTimeFormat.format(new Date()).split("&")[0];
        if (today.equals(motiStatusRepository.findByUser(user).getLatestFeedDate())) {
            return true;
        } else {
            return false;
        }
    }
}
