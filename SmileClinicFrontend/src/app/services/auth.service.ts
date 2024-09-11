import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  isAuthenticated():boolean{
    //Extracting the token

      const token = localStorage.getItem('token');
  
      if (!token) {
        this.router.navigate(['/']);
        return false;
      }
      //Expiry of token check
  
      const tokenPayload = JSON.parse(window.atob(token.split(".")[1]));
      const expiry = tokenPayload.exp;
  
      if (Date.now() >= expiry * 1000) {
        localStorage.clear();
        this.router.navigate(['/']);
        return false;
      }
  
      return true;
}
}
