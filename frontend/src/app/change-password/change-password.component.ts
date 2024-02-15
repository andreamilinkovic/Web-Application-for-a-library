import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  user: User

  old_password: string
  new_password: string
  check_password: string

  changePassword(){
    if(this.new_password != this.check_password){
      alert("Nova lozinka i potvrda lozinke se razlikuju.");
      return;
    }
    this.userService.changePassword(this.user.username, this.old_password, this.new_password).subscribe((resp)=>{
      if(resp != null){
        alert(resp["message"]);
        localStorage.clear();
        this.router.navigate(["login"]).then(() => {
          window.location.reload();
        })
      }
      else{
        alert("Stara lozinka nije ispravna.");
      }
    })
  }

}
