import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookAppointmentComponent } from './book-appointment.component';
import { BookAppointmentRoutes } from './book-appointment.routing';
import { MaterialModule } from '../shared/material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReviewDetailsComponent } from './review-details/review-details.component';
import { SlotNamePipeModule } from '../shared/slot-name.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(BookAppointmentRoutes),
    FormsModule,
    ReactiveFormsModule,
    SlotNamePipeModule

   
  ],
  declarations: [BookAppointmentComponent, ReviewDetailsComponent],
  exports: [
   BookAppointmentComponent // Export if needed in other parts of your app
  ]
})
export class BookAppointmentModule { }
