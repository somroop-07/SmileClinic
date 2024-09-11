import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SlotNamePipe } from './slot-name.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [SlotNamePipe],
  exports: [
  SlotNamePipe
  ]
})
export class SlotNamePipeModule { }