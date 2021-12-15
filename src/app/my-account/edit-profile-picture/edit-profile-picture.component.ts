import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CheckAuthService } from 'src/app/service/checkAuthService/check-auth.service';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-edit-profile-picture',
  templateUrl: './edit-profile-picture.component.html',
  styleUrls: ['./edit-profile-picture.component.css']
})
export class EditProfilePictureComponent implements OnInit {

  image:File | null |undefined = new File(new Array<BlobPart>(),"");
  profilePicture:any;

  constructor(private userService: UserService,private checkAuthService:CheckAuthService,private sanitizer:DomSanitizer,
    private http:HttpClient) { }

  ngOnInit(): void {
      this.profilePicture = this.userService.getProfilePictureFromLocalStorage();
  }

  ngDoCheck() : void{
    this.profilePicture = this.userService.getProfilePictureFromLocalStorage();
  }

  edit(event: any): void {
    this.image = (<HTMLInputElement>event.target).files?.item(0);
    const fd =  new FormData();
    fd.append('image',event.target.files?.item(0),this.image?.name);
   this.userService.updateProfilePicture(this.checkAuthService.getToken(),fd).subscribe(
     data=>{    
      this.userService.saveProfilePicture();
      this.profilePicture = this.userService.getProfilePictureFromLocalStorage();   
     }
   )
  }

  remove(){
    
    let image:Blob = new Blob();
    this.http.get('assets/img/NoProfilePic.jpg', { responseType: 'blob' }).subscribe(data => {
      const fd =  new FormData();
      fd.append('image',data);
      
      this.userService.updateProfilePicture(this.checkAuthService.getToken(),fd).subscribe(
        data=>{    
         this.userService.saveProfilePicture();
         this.profilePicture = this.userService.getProfilePictureFromLocalStorage();   
        }
      ) 
    });
  
  }
}
