package tat.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import feign.RequestInterceptor;
import feign.RequestTemplate;

@Component
public class FeignClientInterceptor implements RequestInterceptor {

    @Autowired
    private TokenContext tokenContext;

    @Override
    public void apply(RequestTemplate template) {
        String token = tokenContext.getCurrentToken();
        if (token != null) {
            template.header("Authorization", "Bearer " + token);
        }
    }
}

