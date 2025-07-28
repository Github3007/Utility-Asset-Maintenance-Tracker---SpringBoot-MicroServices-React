package auth.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {

	// Load JWT secret from environment variable for security
	private final String SECRET = System.getenv("JWT_SECRET") != null ? 
		System.getenv("JWT_SECRET") : "d3780ec3d1cfaba271e0538d4fae686d8367e10155ee424691fbf191eabec53d";

	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	public Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

//	private Claims extractAllClaims(String token) {
//		return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
//	}
	
	private Claims extractAllClaims(String token) {
	    try {
	        return Jwts.parserBuilder()
	                   .setSigningKey(getSignKey())
	                   .build()
	                   .parseClaimsJws(token)
	                   .getBody();
	    } catch (io.jsonwebtoken.ExpiredJwtException e) {
	        throw new RuntimeException("JWT token has expired", e);
	    } catch (io.jsonwebtoken.UnsupportedJwtException e) {
	        throw new RuntimeException("JWT token is unsupported", e);
	    } catch (io.jsonwebtoken.MalformedJwtException e) {
	        throw new RuntimeException("JWT token is malformed", e);
	    } catch (io.jsonwebtoken.security.SecurityException e) {
	        throw new RuntimeException("JWT token signature validation failed", e);
	    } catch (Exception e) {
	        throw new RuntimeException("Invalid JWT token", e);
	    }
	}

	

	private Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	public Boolean validateToken(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}

	public String generateToken(String userName, List<String> roles) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("roles", roles);
		return createToken(claims, userName);
	}

	private String createToken(Map<String, Object> claims, String userName) {
		return Jwts.builder().setClaims(claims).setSubject(userName).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60*24))
				.signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
	}

	private Key getSignKey() {
		byte[] keyBytes = Decoders.BASE64.decode(SECRET);
		return Keys.hmacShaKeyFor(keyBytes);
	}
}
