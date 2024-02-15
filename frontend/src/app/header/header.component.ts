import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(private bookService: BookService, private router: Router) { }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    if(this.user == null){
      this.user_img = "guest.ico"
      this.user_type = "guest"
    } 
    else{
      this.user_img = this.user.image
      this.user_type = this.user.type
    }

    console.log(this.user_img)
    this.search_param = ""
  }

  user: User
  user_img: string
  user_type: string

  search_param: string


  logout(){
    let period = <number>JSON.parse(localStorage.getItem("period"))

    localStorage.clear();
    if(period != null) localStorage.setItem("period", JSON.stringify(period))
    
    //delete accepted reservations
    this.bookService.deleteReservations(this.user.username).subscribe((resp)=>{
      this.user = null;
      this.router.navigate([""]);
      this.ngOnInit();
    })
  }

  search(){
    if(this.search_param == "/admin")
      this.router.navigate(["admin_login"])
    else{
      localStorage.setItem("search_param", this.search_param)
      this.router.navigate(["search_guest"])
    }
  }
}
