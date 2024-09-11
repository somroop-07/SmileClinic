import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AppointmentService } from './appointment.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})


export class CommonService {

  firstName:string="User";
  userDetails:any;
  myAppointments:any;
  upcomingAppointments:any;
  pastAppointments:any;
  departmentList:any;
  doctorList:any;

  constructor(private userService:UserService, private appointmentService:AppointmentService,private ngxService:NgxUiLoaderService) { }

  // Returns date in yyyy-mm-dd format
  getDateInFormat(date:Date):string{

    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns 0-based index
    const day = ('0' + date.getDate()).slice(-2); // Adding leading zero
    
    // Combine them into the yyyy-mm-dd format
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  //returns first name
  getFirstName(fullName: string): string {
    const nameParts = fullName.split(' ');
    return nameParts[0];
  }
  
  
}


export interface User{
  user_id:number,
  name:string,
  email:string,
  password:string, 
  mobile:string,
  role:string
}

export interface AppointmentDTO{
  appointmentId:number, 
  doctorName:string,
  departmentName:string, 
  slotId:number, 
  isCancelled:boolean
  date:Date, 
}
export interface AppointmentAdminDTO{
  appointmentId:number, 
  doctorName:string,
  departmentName:string, 
  userName:string,
  userMobile:string,
  userEmail:string,
  slotId:number, 
  isCancelled:boolean
  date:Date, 
  showContactDetails?:boolean
}

export interface ApiResponse {
  message?: string; // 'message' is optional, adjust based on your API
}