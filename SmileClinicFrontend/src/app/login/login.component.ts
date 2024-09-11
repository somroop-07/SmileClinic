import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   password=true;
   loginForm:any=FormGroup;
  responseMessage:any;

  constructor(private router:Router, private userService:UserService, private snackBarService:SnackbarService, public dialogRef:MatDialogRef<LoginComponent>,
  private ngxService:NgxUiLoaderService, private formBuilder:FormBuilder
  ){}
  ngOnInit(): void {
      this.loginForm=this.formBuilder.group({
        email:[null,[Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
        password:[null,Validators.required],
      })
  }

  onSubmit(){
    this.ngxService.start();
    var formData=this.loginForm.value;
    var data={
      email:formData.email,
      password:formData.password
  }
  this.userService.logIn(data).subscribe((response:any)=>{
    this.ngxService.stop();
    this.dialogRef.close();
    localStorage.setItem('token',response.token);
    let tokenPayload=JSON.parse(window.atob(response.token.split(".")[1]));
    if(tokenPayload.role=="admin")
      this.router.navigate(['/clinic/adminDashboard']);
    else
    this.router.navigate(['/clinic/dashboard']);
  },(error)=>{
    this.ngxService.stop();
    if(error.error?.message)
    this.responseMessage=error.error?.message;
  else
  this.responseMessage=GlobalConstants.genericError;
  this.snackBarService.openSnackBar(this.responseMessage,GlobalConstants.error);
  }
 
)
}
}
