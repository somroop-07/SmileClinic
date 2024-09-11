import { Component,Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DepartmentService } from 'src/app/services/department.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ApiResponse } from 'src/app/services/common.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  departmentForm:any=FormGroup;
  responseMessage:any;

  onEmitStatusChange=new EventEmitter();

  constructor(private fb: FormBuilder,private departmentservice:DepartmentService,private ngxService:NgxUiLoaderService,private snackBarService:SnackbarService){}
  ngOnInit(): void {
 
    this.departmentForm = this.fb.group({
     department: ['', [Validators.required]],
    
   });
}
onSubmit(): void {
  if (this.departmentForm.valid) {
    const department = this.departmentForm.value;
    this.ngxService.start();
   this.departmentservice.addDepartment(department).subscribe((response:ApiResponse)=>{
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

