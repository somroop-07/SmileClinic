import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { AppointmentAdminDTO } from './common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  url=environment.apiUrl;
  constructor(private http:HttpClient) { }

  getMyAppointments(){
    return this.http.get(this.url+"/api/appointment/myBookings")
  }

  cancelAppointment(data:any){
    return this.http.put(this.url+"/api/appointment/bookings",data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    })
  }

  bookAppointment(data:any){
     return this.http.post(this.url+"/api/appointment/bookings",data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
  })
}
  getBookedSlots(date:any,dr_id:any){
    return this.http.get(`${this.url}/api/appointment/slots?date=${date}&doctorId=${dr_id}`);
  }
  getAppointmentsDatewise(date:any):Observable<AppointmentAdminDTO[]>{
    return this.http.get<AppointmentAdminDTO[]>(`${this.url}/api/appointment/bookings?date=${date}`);
  }

}
