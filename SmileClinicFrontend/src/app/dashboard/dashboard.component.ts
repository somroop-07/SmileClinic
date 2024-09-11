import { Component, OnInit,HostListener } from '@angular/core';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';
import { AppointmentService } from '../services/appointment.service';
import { AppointmentDTO } from '../services/common.service';
import { ApiResponse } from '../services/common.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit{

  userDetails:any;
  slotId:number=0;
  myAppointments:any;
  upcomingAppointments:AppointmentDTO[]=[];
  pastAppointments:AppointmentDTO[]=[];
  responseMessage:any;
  isProfileVisible: boolean = false;
  isAppointmentsVisible: boolean = true;
  firstName:any;
  isEditingMobile:boolean=false;
  tempMobile:string='';
  isPastAppointments=false;
  isFutureAppointments=true;
  isDropdownOpen=false;

  constructor(private userService:UserService,private commonService:CommonService,private snackBarService:SnackbarService,private router:Router,
    private ngxService:NgxUiLoaderService,private appointmentService:AppointmentService, private dialog:MatDialog
  ){}
  ngOnInit(): void {
  
    if(this.commonService.userDetails===undefined){
   this.loadProfileDetails();
    }
    else{
      this.userDetails=this.commonService.userDetails;
      this.firstName=this.commonService.firstName;
    }
   if(this.commonService.myAppointments===undefined){
   this.loadMyAppointments();
   }
   else{
    this.myAppointments=this.commonService.myAppointments;
    this.upcomingAppointments=this.commonService.upcomingAppointments;
    this.pastAppointments=this.commonService.pastAppointments;
  }


   

}

// load my profile data
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



//Load all my appointments
loadMyAppointments(){

    this.ngxService.start();
    this.appointmentService.getMyAppointments().subscribe((response)=>{
      this.ngxService.stop();
      this.commonService.myAppointments=response; 
      this.myAppointments=response;
      this.seperateAppointments();
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message)
      this.responseMessage=error.error?.message;
      else
      this.responseMessage=GlobalConstants.genericError;
      
    })
}



showProfile() {
  this.isProfileVisible = true;
  this.isAppointmentsVisible = false;
}

showAppointments() {
  this.isProfileVisible = false;
  this.isAppointmentsVisible = true;
}
cancelAppointment(appointmentId:number){
  
  const dialogConfig=new MatDialogConfig();
  dialogConfig.data={
    message:'Cancel Appointment',
    confirmation:true
  }
  dialogConfig.disableClose = true;

  const dialogRef=this.dialog.open(ConfirmationDialogComponent,dialogConfig);
  const sub=dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
    dialogRef.close();
    var data={
      'appointmentId':appointmentId,
      'isCancelled':true
    }
    this.ngxService.start();
    this.appointmentService.cancelAppointment(data).subscribe((response: ApiResponse)=>{
      this.ngxService.stop();
      this.responseMessage=response?.message;
        this.snackBarService.openSnackBar(this.responseMessage,"");
        this.userDetails.mobile=this.tempMobile;
        this.loadMyAppointments();
    },(error)=>{
      this.ngxService.stop();
      this.tempMobile=this.userDetails.mobile;
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

//Future and past appointment list
seperateAppointments(){
  this.upcomingAppointments.length=0;
  this.pastAppointments.length=0;
  const currentDate = new Date();
  this.myAppointments.forEach((appointment:AppointmentDTO) => {
  const refDate=new Date(appointment.date);

  if(!appointment.isCancelled){
    if (refDate >= currentDate) {
      this.upcomingAppointments.push(appointment);
    } else {
      this.pastAppointments.push(appointment);
    }
  }
  });
  this.upcomingAppointments.sort((a, b) => {
    let dateA = new Date(a.date); // Convert string to Date
    let dateB = new Date(b.date); // Convert string to Date
    return dateA.getTime() - dateB.getTime(); // Compare the dates
  });
  this.pastAppointments.sort((a, b) => {
    let dateA = new Date(a.date); // Convert string to Date
    let dateB = new Date(b.date); // Convert string to Date
    return dateB.getTime() - dateA.getTime(); // Compare the dates
  });
  this.commonService.pastAppointments=this.pastAppointments;
  this.commonService.upcomingAppointments=this.upcomingAppointments;

}

// Method to enable edit mode
editMobile() {
  this.tempMobile=this.userDetails.mobile;
  this.isEditingMobile = true;
}

// Method to save the new mobile number and exit edit mode
saveMobile() {
  
  
  this.isEditingMobile = false;
  if(this.tempMobile!=this.userDetails.mobile){
  this.ngxService.start();
  this.userService.updateMobile(this.userDetails).subscribe((response:ApiResponse)=>{
    this.ngxService.stop();
    this.responseMessage=response?.message;
      this.snackBarService.openSnackBar(this.responseMessage,"");
      this.userDetails.mobile=this.tempMobile;
  },(error)=>{
    this.ngxService.stop();
    this.tempMobile=this.userDetails.mobile;
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

// Method to cancel editing and revert back
cancelEdit() {
  this.tempMobile=this.userDetails.mobile;
  this.isEditingMobile = false;
  
}
toggleFutureAppointments(){
   this.isFutureAppointments=!this.isFutureAppointments;
   if( this.isFutureAppointments && this.isPastAppointments)
    this.isPastAppointments=false;
}
togglePastAppointments(){
   this.isPastAppointments=!this.isPastAppointments;
   if( this.isFutureAppointments && this.isPastAppointments)
    this.isFutureAppointments=false;
}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.closeDropdown();
    }
  }


}

