import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  url=environment.apiUrl;
  constructor(private http:HttpClient) { }

  signUp(data:any){
    return this.http.post(this.url+ "/api/users/signup", data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    })
  }

  logIn(data:any){
    return this.http.post(this.url+ "/api/users/login", data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    })
  }

  // To check whether token exists in localStorage.If present, we validate the token.
  //If not present or invalid, we redirect user to home page
  checkToken(){
    return this.http.get(this.url+"/api/users/checktoken");
  }

  getProfileDetails(){
    return this.http.get(this.url+"/api/users/mydetails")
  }

  updateMobile(data:any): Observable<ApiResponse>{
    return this.http.put<ApiResponse>(this.url+ "/api/users/mydetails", data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    })
  }
}

