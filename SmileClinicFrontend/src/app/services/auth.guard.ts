import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,
    private snackbarService:SnackbarService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot): boolean {
      const expectedRoles = route.data['expectedRoles'];
      const token = localStorage.getItem('token');
      if(!token){
        this.router.navigate(['/']);
        return false;
      }
   let tokenPayload:any;
    //Decoding token
    
    try{
        tokenPayload=JSON.parse(window.atob(token.split(".")[1]));
    }
    catch(err){
      localStorage.clear();
      this.router.navigate(['/']);
      return false;
    }
  
  
    const userRole = tokenPayload.role;
    if(userRole=='user' || userRole=='admin'){
    if (this.authService.isAuthenticated() && expectedRoles.includes(userRole)) {
      return true;
    }
    this.snackbarService.openSnackBar(GlobalConstants.unauthorized,GlobalConstants.error);
    if(userRole=='user'){
      this.router.navigate(['/clinic/dashboard']);
      return false;
    }
    this.router.navigate(['/clinic/adminDashboard']);
    return false;
    }
    else{
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }
}