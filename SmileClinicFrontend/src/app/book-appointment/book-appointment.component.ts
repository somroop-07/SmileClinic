import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonService } from '../services/common.service';
import { DepartmentService } from '../services/department.service';
import { DoctorsService } from '../services/doctors.service';
import { AppointmentService } from '../services/appointment.service';
import { GlobalConstants } from '../shared/global-constants';
import { Doctor } from '../services/doctors.service';
import { Department } from '../services/department.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReviewDetailsComponent } from './review-details/review-details.component';
import { ApiResponse } from '../services/common.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit{

  userDetails:any;
  departmentList:any;
  responseMessage:any;
  doctorList:Doctor[]=[];
  selectedDepartment?: Department;
  searchDoctor: string = '';
  filteredDoctors: Doctor[] = [];
  doctorSuggestions: Doctor[] = [];
  firstName:any;
  selectedDoctor?:Doctor;
  slots:string[]=["12:00-13:00","13:00-14:00","14:00-15:00","15:00-16:00","16:00-17:00","17:00-18:00"];
  slotsFull:number[]=[0,0,0,0,0,0];



  constructor(private userService:UserService,private snackBarService:SnackbarService,private router:Router,private commonService:CommonService,private ngxService:NgxUiLoaderService,private departmentService:DepartmentService,private doctorService:DoctorsService,private appointmentService:AppointmentService,private dialog:MatDialog){}

  ngOnInit(): void {
   
    if(this.commonService.userDetails===undefined){
      this.loadProfileDetails();
       }
       else{
         this.userDetails=this.commonService.userDetails;
         this.firstName=this.commonService.firstName;
       }


  if(this.commonService.departmentList===undefined){
    this.loadAllDepartments();
  }
  else{
    this.departmentList=this.commonService.departmentList;
    
  }

  if(this.commonService.doctorList===undefined){
      this.loadAllDoctors();
  }
  else{
    this.doctorList=this.commonService.doctorList;
    this.filterDoctors();
  }


 
}

loadProfileDetails(){
     

  this.ngxService.start();
  this.userService.getProfileDetails().subscribe((response)=>{
    this.ngxService.stop();
    this.commonService.userDetails=response; 
    this.userDetails=response;
    this.firstName=this.userDetails?.name ? this.commonService.getFirstName(this.userDetails?.name) : "User";
    this.commonService.firstName=this.firstName;
  },(error)=>{
    this.ngxService.stop();
    if(error.error?.message)
    this.responseMessage=error.error?.message;
    else
    this.responseMessage=GlobalConstants.genericError;
    
  })
}

loadAllDepartments(){
  this.ngxService.start();
  this.departmentService.getDepartmentsNotNull().subscribe((response)=>{
    this.ngxService.stop();
    this.commonService.departmentList=response;
    this.departmentList=response;
  },(error)=>{
    this.ngxService.stop();
      if(error.error?.message)
      this.responseMessage=error.error?.message;
      else
      this.responseMessage=GlobalConstants.genericError;
  })
}

loadAllDoctors(){
this.ngxService.start();
  this.doctorService.getDoctors().subscribe((response: Doctor[])=>{
    this.ngxService.stop();
    this.commonService.doctorList=response;
    this.doctorList=response;
    this.filteredDoctors=response;
  },(error)=>{
    this.ngxService.stop();
      if(error.error?.message)
      this.responseMessage=error.error?.message;
      else
      this.responseMessage=GlobalConstants.genericError;
  })
}
filterDoctorsHelper(){
  this.searchDoctor='';
  this.doctorSuggestions=[];
  this.filterDoctors()
}
filterDoctors(){
  this.filteredDoctors=this.doctorList.filter(doc=>{
    return((!this.selectedDepartment || doc.departmentId === this.selectedDepartment.department_id) &&
    (!this.searchDoctor || doc.name.toLowerCase().includes(this.searchDoctor.toLowerCase())))
    
    
  })

  
}

onSearchInput(){
  if (this.searchDoctor.length >= 1) {
    this.doctorSuggestions = this.doctorList.filter((doc) =>
      (!this.selectedDepartment || doc.departmentId === this.selectedDepartment.department_id) &&
      doc.name.toLowerCase().includes(this.searchDoctor.toLowerCase())
    );
  } else {
    this.doctorSuggestions = [];
  }
  this.filterDoctors(); 
}

selectDoctorSuggestion(doctor: Doctor){
  this.searchDoctor = doctor.name;
  this.doctorSuggestions = [];
  this.filterDoctors();

}
clearDepartmentSelection(event: Event): void {

  event.stopPropagation();
  this.selectedDepartment = undefined;
  this.filterDoctors();
}
clearCalenderSelection(event: Event): void {

  event.stopPropagation();
  if(this.selectedDoctor){
 this.selectedDoctor.selectedDate=undefined;
 this.selectedDoctor.selectedSlot=undefined;
  }
}
filterFutureDates = (d: Date | null): boolean =>{
  const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const twoWeeksFromNow = new Date(today);
    twoWeeksFromNow.setDate(today.getDate() + 14); 

    return d ? d >=today && d <= twoWeeksFromNow : false;
}

onDateChange(event: any,doctor:Doctor): void {
 if(this.selectedDoctor)
 {
  this.selectedDoctor.selectedDate=undefined;
  this.selectedDoctor.selectedSlot=undefined;
 }
  doctor.selectedDate = event.value;
  this.selectedDoctor=doctor;
  this.slotsFull=[0,0,0,0,0,0];
  this.getBookedSlots();
}
getBookedSlots(){
  let appointmentDate:string='';
  if(this.selectedDoctor?.selectedDate)
    appointmentDate=this.commonService.getDateInFormat(this.selectedDoctor?.selectedDate);
  else
  return;
  let doctorId=this.selectedDoctor?.dr_id;
  let bookings:any;
  this.ngxService.start();
  this.appointmentService.getBookedSlots(appointmentDate,doctorId).subscribe((response)=>{
    this.ngxService.stop();
    bookings=response;
    for(let booking of bookings){
      console.log(booking);
       this.slotsFull[booking-1]=1;
    }
  },(error)=>{
    this.ngxService.stop();
    if(error.error?.message)
    this.responseMessage=error.error?.message;
    else
    this.responseMessage=GlobalConstants.genericError;
    
  })
}
setSlot(i:number){
  if(this.selectedDoctor)
  this.selectedDoctor.selectedSlot=i;
}
handleReviewAction(){
  let appointmentDate:string='';
  if(this.selectedDoctor?.selectedDate)
    appointmentDate=this.commonService.getDateInFormat(this.selectedDoctor?.selectedDate);

    
  const dialogConfig=new MatDialogConfig();
  dialogConfig.width="400px";
  dialogConfig.data={
    appointmentDetails:{
      dr_name:this.selectedDoctor?.name,
      department_name:this.selectedDoctor?.department_name,
      date:appointmentDate,
      slot_id:this.selectedDoctor?.selectedSlot
    },
    reviewDetails:true
  }
  dialogConfig.disableClose = true; // Prevent closing on outside click or escape key
  const dialogRef=this.dialog.open(ReviewDetailsComponent,dialogConfig);
  const sub=dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
  dialogRef.close();
  this.ngxService.start();
  
  const appointmentData={
    drId:this.selectedDoctor?.dr_id,
    isCancelled:false,
    user_id:this.userDetails.user_id,
    date:appointmentDate,
    slotId:this.selectedDoctor?.selectedSlot
  };
  console.log(appointmentData);
  this.appointmentService.bookAppointment(appointmentData).subscribe((response:ApiResponse)=>{
    this.ngxService.stop();
    this.responseMessage=response?.message;
    this.commonService.myAppointments=undefined;
    this.getBookedSlots()
    this.router.navigate(['/clinic/dashboard']);
    this.snackBarService.openSnackBar(this.responseMessage,"");
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
    
    
})

}
} 
