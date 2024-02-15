import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.msg_flag = false
  }

  username: string = ""
  password: string = ""

  message: string = ""
  msg_flag: boolean

  login(){
    if(this.username == "" || this.password == ""){
      this.message = "Niste popunili sva polja."
      return;
    }
    this.userService.login(this.username, this.password).subscribe((resp: User)=>{
      if(resp){
        localStorage.setItem("user", JSON.stringify(resp));

        if(resp.type=="citalac" || resp.type=="moderator"){
          localStorage.removeItem("user");
          this.message = "Niste administrator."
          this.msg_flag = true
        }
        else if(resp.type=="admin"){
          this.router.navigate(["admin"]).then(() => {
            window.location.reload();
          });
        }
      }
      else {
        this.message = "Nisu uneti ispravni podaci."
        this.msg_flag = true
      }
    })
  }

}
