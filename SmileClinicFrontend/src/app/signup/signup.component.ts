import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
 
  password=true;
  confirmPassword=true;
  signupForm:any=FormGroup;
  responseMessage:any;
  constructor(private router:Router, private userService:UserService, private snackBarService:SnackbarService, public dialogRef:MatDialogRef<SignupComponent>,
  private ngxService:NgxUiLoaderService, private formBuilder:FormBuilder
  ){}
  ngOnInit(): void {

    // Simpler syntax for Reactive Angular Forms
      this.signupForm=this.formBuilder.group({
        name:[null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
        email:[null,[Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
        mobile:[null,[Validators.required, Validators.pattern(GlobalConstants.contactNumberegex)]],
        password:[null,Validators.required],
        confirmPassword:[null,Validators.required]
      })
  }

  validateSubmit(){
    if(this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value){
      return true;
    }
    else{
      return false;
    }
  }

  onSubmit(){
    this.ngxService.start();
    var formData=this.signupForm.value;
    var data={
      name: formData.name,
      email:formData.email,
      mobile:formData.mobile,
      password:formData.password,
      role:"user"
    }
    console.log(data);

    this.userService.signUp(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage=response?.message;
      this.snackBarService.openSnackBar(this.responseMessage,"");
      this.router.navigate(['/']);
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
         this.responseMessage=error.error?.message;
      }
      else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackBarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

}
