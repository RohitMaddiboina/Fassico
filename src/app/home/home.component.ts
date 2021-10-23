import { Component, OnInit } from '@angular/core';
import { DataShareToastService } from '../service/dataShareToast/data-share-toast.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message: string
  constructor(public data:DataShareToastService,public toastr:ToastrService) { 
    this.message='';
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => {
      if(!message.includes("default")){

        this.toastr.success(message);
      }
    })
    
  }

  
}
