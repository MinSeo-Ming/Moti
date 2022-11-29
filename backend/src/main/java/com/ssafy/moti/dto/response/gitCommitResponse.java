package com.ssafy.moti.dto.response;

import lombok.*;
import org.springframework.stereotype.Component;

@Getter
@Setter
@AllArgsConstructor
@Component
@Builder
@NoArgsConstructor
public class gitCommitResponse {
    String sha;
    String nodeId;

    @Data
    @NoArgsConstructor
    public static class Commit{

        @Data
        @NoArgsConstructor
        public static class  Author {
            String name;
            String email;
            String date;
        }
        String message;
        @Data
        @NoArgsConstructor
        public static class  tree{
            String sha;
            String url;
        }

        String url;
        Long commentCount;
        @Data
        @NoArgsConstructor
        public static class  verification{
            String name;
            String email;
            String date;
        }

    }
    String url;
    String htmlUrl;
    String commentUrl;
    @Data
    @NoArgsConstructor
    public static class Author{
        String login;
        String id;
        String nodeId;
        String avatar_url;
        String gravatarId;
        String url;
        String htmlUrl;
        String followersUrl;
        String followingUrl;
        String gistsUrl;
        String starredUrl;
        String subscriptionsUrl;
        String organizations_Url;
        String reposUrl;
        String eventsUrl;
        String receivedEventsUrl;
        String type;
        boolean siteAdmin;
    }

    @Data
    @NoArgsConstructor
    public static class Committer{
        String login;
        String id;
        String nodeId;
        String avatar_url;
        String gravatarId;
        String url;
        String htmlUrl;
        String followersUrl;
        String followingUrl;
        String gistsUrl;
        String starredUrl;
        String subscriptionsUrl;
        String organizations_Url;
        String reposUrl;
        String eventsUrl;
        String receivedEventsUrl;
        String type;
        boolean siteAdmin;
    }
    @Data
    @NoArgsConstructor
    public static class Parents{

    }

}
