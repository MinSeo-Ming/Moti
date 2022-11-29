package com.ssafy.moti.common.config;

import com.fasterxml.classmate.TypeResolver;
import com.ssafy.moti.dto.UserThemeDto;
import com.ssafy.moti.dto.response.item.ItemPurchaseResponse;
import com.ssafy.moti.dto.response.item.ItemUseResponse;
import com.ssafy.moti.dto.response.item.UserGoodsResponse;
import com.ssafy.moti.dto.response.item.UserInventoryResponse;
import com.ssafy.moti.dto.response.moti.*;
import com.ssafy.moti.dto.response.user.UserNameResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.*;

@Configuration
@EnableWebMvc
public class SwaggerConfig {
    @Bean
    public Docket restApi() {
        TypeResolver typeResolver= new TypeResolver();
        return new Docket(DocumentationType.SWAGGER_2)
                .consumes(getConsumeContentTypes())
                .produces(getProduceContentTypes())
                .apiInfo(apiInfo())
                .useDefaultResponseMessages(false)
                .securityContexts(Collections.singletonList(securityContext()))
                .securitySchemes(List.of(apiKey()))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.moti.controller"))
                .paths(PathSelectors.ant("/**"))
                .build().additionalModels(typeResolver.resolve(MotiAllInfoResponse.class),
                        typeResolver.resolve(MotiDeadResponse.class),
                        typeResolver.resolve(MotiFeedResponseResponse.class),
                        typeResolver.resolve(MotiRankListResponse.class),
                        typeResolver.resolve(MotiImgListResponse.class),
                        typeResolver.resolve(MotiFedCheckResponse.class),
                        typeResolver.resolve(ItemPurchaseResponse.class),
                        typeResolver.resolve(ItemUseResponse.class),
                        typeResolver.resolve(UserGoodsResponse.class),
                        typeResolver.resolve(UserInventoryResponse.class),
                        typeResolver.resolve(UserThemeDto.class),
                        typeResolver.resolve(UserNameResponse.class)
                        );
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return List.of(new SecurityReference("Authorization", authorizationScopes));
    }

    private ApiKey apiKey() {
        return new ApiKey("Authorization", "Authorization", "header");
    }

    private Set<String> getConsumeContentTypes() {
        Set<String> consumes = new HashSet<>();
        consumes.add("application/json;charset=UTF-8");
        consumes.add("application/x-www-form-urlencoded");
        return consumes;
    }

    private Set<String> getProduceContentTypes() {
        Set<String> produces = new HashSet<>();
        produces.add("application/json;charset=UTF-8");
        return produces;
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("MOTI REST API")
                .version("0.0.1")
                .description("Moti REST API")
                .build();
    }
}
