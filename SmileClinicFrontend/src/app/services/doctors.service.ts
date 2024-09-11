import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  url=environment.apiUrl;
  constructor(private http:HttpClient) { }

  getDoctors(): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(this.url+'/api/doctors');
  }
  getDoctorsbyDepartment(departmentId:any){
    return this.http.get(this.url+'/api/doctors/'+departmentId);
  }
  addDoctor(data:any){
    return this.http.post(this.url+"/api/doctors",data,{
     headers:new HttpHeaders().set('Content-Type','application/json')
  })
  }
  updateDoctor(data:any){
    return this.http.put(this.url+"/api/doctors",data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
   })
  }
  deleteDoctor(doctor_id:any){
     return this.http.delete(this.url+"/api/doctors/"+doctor_id);
  }
}

export interface Doctor{
  departmentId:number,
  department_name:string,
  dr_id:number
  name:string,
  description:string,
  fees:number,
  selectedDate?: Date;
  selectedSlot?: number
}