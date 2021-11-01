import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Orders } from 'src/app/models/Order.model';
import { ConfirmCancellation } from '../orders.component';

@Component({
  selector: 'app-confirm-cancellation',
  templateUrl: './confirm-cancellation.component.html',
  styleUrls: ['./confirm-cancellation.component.css']
})
export class ConfirmCancellationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmCancellationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmCancellation) { }

  ngOnInit(): void {
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }
  cancelOrder(d:ConfirmCancellation){
    d.cancel=true;
    this.dialogRef.close(d);
  }
}
