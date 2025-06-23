package gs;

import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class LoggingFilter implements GlobalFilter, Ordered {

    private static final Logger logger = LoggerFactory.getLogger(LoggingFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, org.springframework.cloud.gateway.filter.GatewayFilterChain chain) {
        long startTime=System.currentTimeMillis();
        ServerHttpRequest request=exchange.getRequest();
        String traceId=UUID.randomUUID().toString();
    	logger.info("[{}] Incoming request: {} {}",traceId, 
            exchange.getRequest().getMethod(), 
            exchange.getRequest().getURI());

        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
        	long duration=System.currentTimeMillis()-startTime;
            logger.info("[{}] Outgoing response: {} | Time: {} ms", traceId,exchange.getResponse().getStatusCode(),duration);
        }));
    }

    @Override
    public int getOrder() {
        return -1; // Ensure this runs early
    }
}
