import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-about-users',
  templateUrl: './about-users.component.html',
  styleUrls: ['./about-users.component.css']
})
export class AboutUsersComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.allUsers().subscribe((users: User[])=>{
      this.all_users = users
    })

    this.message = ""
  }

  all_users: User[] = []
  message: string


  registerUser(user){
    this.userService.registerUser(user.username).subscribe((resp)=>{
      window.location.reload();
    })
  }

  blockUser(user){
    this.userService.blockUser(user.username).subscribe((resp)=>{
      window.location.reload();
    })
  }

  unblockUser(user){
    this.userService.unblockUser(user.username).subscribe((resp)=>{
      window.location.reload();
    })
  }

  updateUser(user){
    localStorage.setItem("update_user", JSON.stringify(user))
    this.router.navigate(["update_user"])
  }

  deleteUser(user){
    this.userService.deleteUser(user.username).subscribe((resp)=>{
      alert(resp["message"])
      window.location.reload();
    })
  }

  addUser(){
    this.router.navigate(["signup"])
  }

}
