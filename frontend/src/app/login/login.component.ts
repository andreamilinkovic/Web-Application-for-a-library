import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

        if(resp.type=="citalac"){
          this.router.navigate(["citalac"]).then(() => {
            window.location.reload();
          });
        }
        else if(resp.type=="moderator"){
          this.router.navigate(["moderator"]).then(() => {
            window.location.reload();
          });
        }
        else{
          this.message = "Administrator se loguje preko posebne forme."
          localStorage.removeItem("user")
          this.msg_flag = true
        }
      }
      else {
        this.message = "Nisu uneti ispravni podaci."
        this.msg_flag = true
      }
    })
  }

}
