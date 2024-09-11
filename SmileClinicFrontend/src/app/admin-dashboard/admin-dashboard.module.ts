import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminDashboardRoutes } from './admin-dashboard.routing';
import { MaterialModule } from '../shared/material-module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { SlotNamePipeModule } from '../shared/slot-name.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(AdminDashboardRoutes),
    ReactiveFormsModule,FormsModule,SlotNamePipeModule
  ],
  declarations: [AdminDashboardComponent, AddDoctorComponent, AddDepartmentComponent],
  exports: [
  AdminDashboardComponent,AddDoctorComponent,
  
  ]
})
export class AdminDashboardModule { }
