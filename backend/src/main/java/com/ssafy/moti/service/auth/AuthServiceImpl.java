package com.ssafy.moti.service.auth;

import com.ssafy.moti.common.auth.TokenProvider;
import com.ssafy.moti.common.enums.AuthProvider;
import com.ssafy.moti.common.enums.GoodsType;
import com.ssafy.moti.entity.deleteuser.DeleteUser;
import com.ssafy.moti.entity.dev.item.ItemCatalog;
import com.ssafy.moti.entity.dev.item.UserInventory;
import com.ssafy.moti.entity.dev.user.UserAccount;
import com.ssafy.moti.entity.dev.user.User;
import com.ssafy.moti.entity.dev.item.UserGoods;
import com.ssafy.moti.entity.dev.user.UserTheme;
import com.ssafy.moti.repository.deleteuser.DeleteUserRepository;
import com.ssafy.moti.repository.dev.item.ItemCatalogRepository;
import com.ssafy.moti.repository.dev.item.UserInventoryRepository;
import com.ssafy.moti.repository.dev.user.UserAccountRepository;
import com.ssafy.moti.repository.dev.user.UserGoodsRepository;
import com.ssafy.moti.repository.dev.user.UserRepository;
import com.ssafy.moti.repository.dev.user.UserThemeRepository;
import org.kohsuke.github.GHMyself;
import org.kohsuke.github.GitHub;
import org.kohsuke.github.GitHubBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private UserGoodsRepository userGoodsRepository;

    @Autowired
    private UserInventoryRepository userInventoryRepository;

    @Autowired
    private UserThemeRepository userThemeRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private DeleteUserRepository deleteUserRepository;

    @Autowired
    private ItemCatalogRepository itemCatalogRepository;

    @Override
    public GHMyself getUserInfoFromGitHub(String accessToken) throws IOException {
        GitHub gitHub = new GitHubBuilder()
                .withOAuthToken(accessToken)
                .build();

        gitHub.checkApiUrlValidity();

        return gitHub.getMyself();
    }

    @Override
    public void save(UserAccount userAccount) {
        userAccountRepository.save(userAccount);
    }

    @Override
    public Optional<UserAccount> findByUserAndProvider(User userNo, AuthProvider provider) {
        return userAccountRepository.findByUserAndProvider(userNo, provider);
    }

    @Override
    public Optional<DeleteUser> findUserFromDelete(String userName) {
        return deleteUserRepository.findByUserName(userName);
    }

    @Override
    @Transactional
    public User initUserWith(GHMyself githubUser, String accessToken) throws IOException {
        User saved = userRepository.save(User.builder()
                .userName(githubUser.getLogin())
                .password(passwordEncoder.encode(githubUser.getLogin()))
                .build()
        );

        initUserAccountWith(saved, AuthProvider.GITHUB, accessToken);

        initUserGoods(saved);

        initUserTheme(saved);

        welcomeGift(saved);

        return saved;
    }

    private void welcomeGift(User user) {
        ItemCatalog reset = itemCatalogRepository.findByItemCatalogNo(1L);
        ItemCatalog nameTag = itemCatalogRepository.findByItemCatalogNo(2L);
        ItemCatalog candy = itemCatalogRepository.findByItemCatalogNo(3L);

        userInventoryRepository.save(UserInventory.builder()
                .itemCatalog(reset)
                .user(user)
                .itemCount(1L)
                .build()
        );

        userInventoryRepository.save(UserInventory.builder()
                .itemCatalog(nameTag)
                .user(user)
                .itemCount(1L)
                .build()
        );

        userInventoryRepository.save(UserInventory.builder()
                .itemCatalog(candy)
                .user(user)
                .itemCount(3L)
                .build()
        );
    }

    private void initUserAccountWith(User user, AuthProvider provider, String providerID) {
         userAccountRepository.save(UserAccount.builder()
                .user(user)
                .provider(provider)
                .providerID(providerID)
                .build()
        );
    }

    private void initUserGoods(User user) {
        for(GoodsType goodsType: GoodsType.values()) {
            userGoodsRepository.save(UserGoods.builder()
                    .goodsType(goodsType)
                    .user(user)
                    .goodsCount(100L)
                    .build()
            );
        }
    }

    private void initUserTheme(User user) {
        userThemeRepository.save(UserTheme.builder()
                .user(user)
                .deviceColor("#5A6078")
                .buttonColor("#FBBC05")
                .build()
        );
    }

    @Override
    public String authenticate(User user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUserName(),
                        user.getUserName()
                )
        );
        return createToken(authentication);
    }

    private String createToken(Authentication authentication) {
        return tokenProvider.createToken(authentication);
    }
}
