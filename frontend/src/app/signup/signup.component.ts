import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { ImageService } from '../services/image.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private imageService: ImageService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"))
  }

  user: User

  username: string
  password: string
  password_check: string
  firstname: string
  lastname: string
  address: string
  tel: string
  mail: string
  image: string = "guest.ico"

  img_file

  message: string = ""

  onFileSelected(event){
    const file = event.target.files[0];
    this.img_file = file
    this.image = file.name;
  }

  signup(){
    if(this.password != this.password_check){
      this.message = "Lozinka i potvrda lozinke se razlikuju.";
      return;
    }

    if(this.img_file == null){
      this.image = "guest.ico"
      this.userService.signup(this.username, this.password, this.firstname, this.lastname, this.address, this.tel, this.mail, this.image).subscribe(resp=>{
        this.message = resp["message"];
        if(this.user != null){
          this.userService.registerUser(this.username).subscribe(resp=>{
            this.router.navigate(["about_users"]);
          })
        }
      })
    } 
    else{
      const formData = new FormData();
      formData.append('file', this.img_file);

      this.imageService.uploadImage(this.img_file).subscribe((res)=>{
        this.userService.signup(this.username, this.password, this.firstname, this.lastname, this.address, this.tel, this.mail, this.image).subscribe(resp=>{
          this.message = resp["message"];
          if(this.user != null){
            this.userService.registerUser(this.username).subscribe(resp=>{
              this.router.navigate(["about_users"]);
            })
          }
        })
      });
    }
  }

}
