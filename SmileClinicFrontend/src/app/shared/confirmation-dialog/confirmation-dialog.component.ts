import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  // A class that allows emitting events, often used to send data or notify other components about changes.
   onEmitStatusChange=new EventEmitter();
   details:any={};

   //token that allows injecting data into the dialog component.
   constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any){}

   ngOnInit(): void {
       if(this.dialogData && this.dialogData.confirmation){
        this.details=this.dialogData;
       }
   }
   handleChangeAction(){
    this.onEmitStatusChange.emit();
   }
}
