import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { MaterialModule } from '../shared/material-module';
import { FormsModule } from '@angular/forms'; 
import { SlotNamePipeModule } from '../shared/slot-name.module';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(DashboardRoutes),
    FormsModule,
    SlotNamePipeModule 

  ],
  declarations: [DashboardComponent],
  exports: [
    DashboardComponent // Export if needed in other parts of your app
  ]
})
export class DashboardModule { }
