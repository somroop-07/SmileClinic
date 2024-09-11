import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  url=environment.apiUrl;
  constructor(private http:HttpClient) { }

  getDepartmentsNotNull(){
    const params = new HttpParams()
      .set('isUser', true)
    return this.http.get(this.url+'/api/departments',{params});
  }

getDepartments(){

  return this.http.get(this.url+'/api/departments');
}
addDepartment(data:any){
  return this.http.post(this.url+"/api/departments",data,{
   headers:new HttpHeaders().set('Content-Type','application/json')
})
}
}

export interface Department{
  department_id:number,
  department:string
}