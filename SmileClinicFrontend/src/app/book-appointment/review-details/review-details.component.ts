import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.scss']
})
export class ReviewDetailsComponent implements OnInit {

  // A class that allows emitting events, often used to send data or notify other components about changes.
   onEmitStatusChange=new EventEmitter();
   appointmentDetails:any={};

   //token that allows injecting data into the dialog component.
   constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any){}

   ngOnInit(): void {
       if(this.dialogData && this.dialogData.reviewDetails){
        this.appointmentDetails=this.dialogData.appointmentDetails;
        console.log(this.appointmentDetails);
       }
   }
   handleChangeAction(){
    this.onEmitStatusChange.emit();
   }
}
