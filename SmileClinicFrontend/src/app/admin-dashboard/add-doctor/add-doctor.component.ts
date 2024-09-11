import { Component,Inject, OnInit,EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DoctorsService } from 'src/app/services/doctors.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ApiResponse } from 'src/app/services/common.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {

 
   departmentList:any={};
   doctorForm:any=FormGroup;
   doctorDetails:any;
   responseMessage:any;

   onEmitStatusChange=new EventEmitter();
 
  

   //token that allows injecting data into the dialog component.
   constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,private fb: FormBuilder,private doctorService:DoctorsService,private ngxService:NgxUiLoaderService,private snackBarService:SnackbarService){}

   ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required]],
      department_id: ['', [Validators.required]],
      description: ['', [Validators.required]],
      fees: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
       if(this.dialogData && this.dialogData.addDoctors){
        this.departmentList=this.dialogData.departmentList;
       if(this.dialogData.doctorDetails){
        this.doctorDetails=this.dialogData.doctorDetails;
        console.log(this.doctorDetails);
        this.prePopulateForm();
       }
       }
      
   }
   onSubmit(): void {
    if (this.doctorForm.valid) {
      const doctorFormDetails = this.doctorForm.value;
    if (doctorFormDetails.name && !doctorFormDetails.name.startsWith('Dr.')) {
      // Ensure "Dr." is present before submitting
      doctorFormDetails.name='Dr. '+  doctorFormDetails.name;
    }
      this.ngxService.start();
      //Update Doctor
      if(this.doctorDetails){
        doctorFormDetails.dr_id=this.doctorDetails.dr_id;
        this.doctorService.updateDoctor(doctorFormDetails).subscribe((response:ApiResponse)=>{
          this.ngxService.stop();
          this.responseMessage=response?.message;
            this.snackBarService.openSnackBar(this.responseMessage,"");
            this.onEmitStatusChange.emit();
        },(error)=>{
          this.ngxService.stop();
      if(error.error?.message)
       this.responseMessage=error.error?.message;
      else
        this.responseMessage=GlobalConstants.genericError;
        this.snackBarService.openSnackBar(this.responseMessage,GlobalConstants.error);
        })
      }

      //Add doctor
      else{
         this.doctorService.addDoctor(doctorFormDetails).subscribe((response:ApiResponse)=>{
          this.ngxService.stop();
          this.responseMessage=response?.message;
            this.snackBarService.openSnackBar(this.responseMessage,"");
            this.onEmitStatusChange.emit();
        },(error)=>{
          this.ngxService.stop();
          if(error.error?.message)
          this.responseMessage=error.error?.message;
        else
          this.responseMessage=GlobalConstants.genericError;
          this.snackBarService.openSnackBar(this.responseMessage,GlobalConstants.error);
        })
      }
 
    }
  }
  prePopulateForm(){
    const prepopulatedData = {
    
      name: this.doctorDetails.name,
      department_id: this.doctorDetails.departmentId,
      description: this.doctorDetails.description,
      fees: this.doctorDetails.fees
    };
    this.doctorForm.patchValue(prepopulatedData);
  }

  clearDepartmentSelection() {
    this.doctorForm.get('department_id').reset();
    
  }
}
