import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MaterialModule } from './shared/material-module';
import { HomeComponent } from './home/home.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';






//Configuration for Loader
const ngxUiLoaderConfig:NgxUiLoaderConfig={
     text:"Loading...",
     textColor:"#FFFFFF",
     textPosition:"center-center",
     bgsColor:"#3D2022",
     fgsColor:"#3D2022",
     fgsType:SPINNER.ballSpinFadeRotating,
     fgsSize:100,
     hasProgressBar:false
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FullLayoutComponent,
    SignupComponent,
    LoginComponent,
    ConfirmationDialogComponent,


 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    
  ],
  providers: [HttpClientModule,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
