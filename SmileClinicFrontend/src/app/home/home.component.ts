import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   constructor(private dialog:MatDialog, private router:Router, private userService:UserService){}
   ngOnInit(): void {
       this.userService.checkToken().subscribe((response:any)=>{
         console.log(response);
         const token = localStorage.getItem('token');
         if(!token){
           this.router.navigate(['/']);
           return false;
         }
         let tokenPayload:any;
         try{
          tokenPayload=JSON.parse(window.atob(token.split(".")[1]));
      }
      catch(err){
        localStorage.clear();
        this.router.navigate(['/']);
        return false;
      }
      if(tokenPayload.role=="user")
          this.router.navigate(['/clinic/dashboard']);
      else
      this.router.navigate(['/clinic/adminDashboard']);
    return true;
       },(error:any)=>{
        console.log(error);
       })
   }

   signUpAction(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width="550px";
    dialogConfig.disableClose = true; // Prevent closing on outside click or escape key
    dialogConfig.autoFocus = true;
    this.dialog.open(SignupComponent,dialogConfig);
   }

   handleLoginAction(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width="450px";
    dialogConfig.disableClose = true; // Prevent closing on outside click or escape key
    dialogConfig.autoFocus = true;
    this.dialog.open(LoginComponent,dialogConfig);
   }
}
