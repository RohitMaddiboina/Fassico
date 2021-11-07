import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    @Inject(MAT_DIALOG_DATA) public data: ConfirmCancellation,public fb:FormBuilder) { }

    form:any
  ngOnInit(): void {
    this.form = this.fb.group({
      quantity: ["", [Validators.required]],
      reason:[]
  });
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }
  cancelOrder(d:ConfirmCancellation){
    d.cancel=true;
    d.quantity=this.form.value.quantity    
    d.reason=this.form.value.reason
    console.log(d)
    this.dialogRef.close(d);
  }

  get f(){
    return this.form.controls
  }
  counter(data: ConfirmCancellation) {
    return new Array((data.quantity));
}
}
