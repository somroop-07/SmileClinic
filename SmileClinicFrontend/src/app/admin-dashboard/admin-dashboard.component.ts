import { Component, OnInit,HostListener } from '@angular/core';
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
import { ApiResponse } from '../services/common.service';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { AppointmentAdminDTO } from '../services/common.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{

  isDropdownOpen=false;
  isDepartmentsVisible=false;
  isAppointmentsVisible=true;
  departmentList:any;
  doctorList:Doctor[]=[];
  selectedDepartment?: Department;
  searchDoctor: string = '';
  filteredDoctors: Doctor[] = [];
  doctorSuggestions: Doctor[] = [];
  selectedDoctor?:Doctor;
  responseMessage:any;
  newDepartment:string="";
  appointmentList:AppointmentAdminDTO[]=[];
  slotAppointments: any[][] = [[],[], [], [], [], []]; 
  selectedDate?:Date;


  constructor(private userService:UserService,private snackBarService:SnackbarService,private router:Router,private commonService:CommonService,private ngxService:NgxUiLoaderService,private departmentService:DepartmentService,private doctorService:DoctorsService,private appointmentService:AppointmentService,private dialog:MatDialog){}

  ngOnInit(): void {
    this.selectedDate=new Date();
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
    const today = new Date();
    this.loadAppointmentsByDate(today);
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
  showDepartments(){
    this.isDepartmentsVisible=true;
    this.isAppointmentsVisible=false;
  }
  showAppointments(){
    this.isAppointmentsVisible=true;
    this.isDepartmentsVisible=false;
  }
  loadAllDepartments(){
    this.ngxService.start();
    this.departmentService.getDepartments().subscribe((response)=>{
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
 

  onAddDepartment(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width="550px";
    dialogConfig.disableClose = true; // Prevent closing on outside click or escape key
    const dialogRef=this.dialog.open(AddDepartmentComponent,dialogConfig);
    const sub=dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      dialogRef.close();
      this.loadAllDepartments();
    })
  }
  onEditDoctor(doctor:Doctor){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width="550px";

    dialogConfig.data={
         'departmentList':this.departmentList,
         'addDoctors':true,
         'doctorDetails':doctor
    }
    
    dialogConfig.disableClose = true; // Prevent closing on outside click or escape key
    const dialogRef=this.dialog.open(AddDoctorComponent,dialogConfig);
    const sub=dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      dialogRef.close();
      this.loadAllDoctors();
      this.selectedDepartment=undefined;
    })
  }
  
  onAddDoctor(){
  const dialogConfig=new MatDialogConfig();
  dialogConfig.width="550px";
  dialogConfig.data={
       'departmentList':this.departmentList,
       'addDoctors':true
  }
  
  dialogConfig.disableClose = true; // Prevent closing on outside click or escape key
  const dialogRef=this.dialog.open(AddDoctorComponent,dialogConfig);
  const sub=dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
    dialogRef.close();
    this.loadAllDoctors();
  })
}
  onDeleteDoctor(doctor:Doctor){
    let doctorId=doctor.dr_id;
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      message:'Delete this doctor',
      confirmation:true
    }
    dialogConfig.disableClose = true;
  
    const dialogRef=this.dialog.open(ConfirmationDialogComponent,dialogConfig);
    const sub=dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      dialogRef.close();
      this.ngxService.start();
      this.doctorService.deleteDoctor(doctorId).subscribe((response:ApiResponse)=>{
        this.ngxService.stop();
        this.responseMessage=response?.message;
          this.snackBarService.openSnackBar(this.responseMessage,"");
          this.loadAllDoctors();
          this.selectedDepartment=undefined;
      },(error)=>{
        this.ngxService.stop();
        if(error.error?.message)
        this.responseMessage=error.error?.message;
      else
      this.responseMessage=GlobalConstants.genericError;
      this.snackBarService.openSnackBar(this.responseMessage,GlobalConstants.error);
      })
    })

  }

  loadAppointmentsByDate(today:Date){
    const todayDate=this.commonService.getDateInFormat(today);
    this.slotAppointments=[[],[], [], [], [], []]; 
    this.ngxService.start();
    this.appointmentService.getAppointmentsDatewise(todayDate).subscribe((response:AppointmentAdminDTO[])=>{
      this.ngxService.stop();
      this.appointmentList=response;
      this.splitAppointmentsBySlot(this.appointmentList);
    
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message)
      this.responseMessage=error.error?.message;
    else
    this.responseMessage=GlobalConstants.genericError;
    this.snackBarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  onDateChange(selectedDate: Date): void {
    
    this.loadAppointmentsByDate(selectedDate);
  }

 
  splitAppointmentsBySlot(appointmentList:AppointmentAdminDTO[]): void {
     appointmentList.forEach(appointment => {
      const slotIndex = appointment.slotId-1;
      this.slotAppointments[slotIndex].push(appointment);
    });
  }
  toggleContactDetails(appointment: AppointmentAdminDTO): void {
    appointment.showContactDetails = !appointment.showContactDetails;
  }
  clearCalenderSelection(event: Event): void {

    event.stopPropagation();
    this.selectedDate=new Date();
    this.loadAppointmentsByDate(this.selectedDate);
  }

}
