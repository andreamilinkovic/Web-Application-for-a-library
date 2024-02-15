import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { ImageService } from '../services/image.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private userService: UserService, private imageService: ImageService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("update_user"));

    this.firstname = this.user.firstname
    this.lastname = this.user.lastname
    this.address = this.user.address
    this.tel = this.user.tel
    this.mail = this.user.mail
    this.image = this.user.image
    this.type = this.user.type

    this.message = ""
  }

  user: User

  firstname: string
  lastname: string
  address: string
  tel: string
  mail: string
  image: string
  type: string

  img_file

  message: string = ""

  onFileSelected(event){
    const file = event.target.files[0];
    this.img_file = file
    this.image = file.name;
  }

  updateProfile(){
    if(this.img_file == null){
      this.userService.updateProfile(this.user.username, this.firstname, this.lastname, this.address, this.tel, this.mail, this.image, this.type).subscribe((resp: User)=>{
        if(resp == null){
          this.message = "Korisnik sa zadatim mejlom vec postoji.";
        }
        else{
          this.router.navigate(["about_users"])
        }   
      })
    }
    else{
      this.imageService.uploadImage(this.img_file).subscribe(resp=>{
        this.userService.updateProfile(this.user.username, this.firstname, this.lastname, this.address, this.tel, this.mail, this.image, this.type).subscribe((resp: User)=>{
          if(resp == null){
            this.message = "Korisnik sa zadatim mejlom vec postoji.";
          }
          else{
            this.router.navigate(["about_users"])
          }   
        })
      })
    }
  }

  dismiss(){
    localStorage.removeItem("update_user")
    this.router.navigate(["about_users"])
  }

}
