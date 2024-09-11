package com.example.SmileClinicBackend.com.JWT;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    JwtUtil jwtService;
    
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    String userName = null;
    Claims claims=null;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException,java.io.IOException {

    	//Bypass filter if signup or login urls
  	if(request.getServletPath().matches("/api/users/login|/api/users/signup")) {
    		filterChain.doFilter(request, response);
   	}
    	
    	else {
    		
    	//JWT tokens available in Bearer of Authorization Header.
        String authHeader = request.getHeader("Authorization");
        String token = null;
      
        
        //Extract Token from Authorization Header
        if(authHeader != null && authHeader.startsWith("Bearer ")){
            token = authHeader.substring(7);   //Removing Bearer_
            userName = jwtService.extractUserName(token);
            claims=jwtService.extractAllClaims(token);
        }
        
        //Checks if username not null & whether the current security context  already has an authenticated user.
        if(userName != null && SecurityContextHolder.getContext().getAuthentication()==null){

            UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
            
         /*Validates token and generates authentication object (authToken) 
          for UsernamePasswordAuthentication filter*/
            if(jwtService.validateToken(token, userDetails)){
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                /*set authentication information about user in security context 
                which contains info about authenticated user and their roles or authorities*/
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        //Sends the request to Spring Security filter
        filterChain.doFilter(request, response);
    }
    
    }
    
    public boolean isAdmin() {
    	return "admin".equalsIgnoreCase((String)claims.get("role"));
    }
    public boolean isUser() {
    	return "user".equalsIgnoreCase((String)claims.get("role"));
    }
    public String getUserName() {
    	return userName;
    }
}
