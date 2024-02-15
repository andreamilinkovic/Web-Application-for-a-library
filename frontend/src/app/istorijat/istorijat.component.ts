import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { History } from '../models/history';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-istorijat',
  templateUrl: './istorijat.component.html',
  styleUrls: ['./istorijat.component.css']
})
export class IstorijatComponent implements OnInit {

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"))
    this.bookService.myHistory(this.user.username).subscribe((resp: History[])=>{
      if(resp.length > 0){
        this.my_history = resp;
        this.sortByReturned();
        this.message = ""
      }
      else
        this.message = "Do sada niste zaduzivali knjige."
    })
  }

  user: User
  my_history: History[] = []
  sort_by: string = "returned"

  message: string

  book(id){
    localStorage.setItem("book", JSON.stringify(id));
    this.router.navigate(["book"]);
  }

  sort(){
    switch(this.sort_by){
      case "title":{
        this.sortByTitle();
        break;
      }
      case "author":{
        this.sortByAuthor();
        break;
      }
      case "booked":{
        this.sortByBooked();
        break;
      }
      case "returned":{
        this.sortByReturned();
        break;
      }
    }
  }

  sortByTitle(){
    this.my_history.sort((book1, book2)=>{
      if(book1.title < book2.title){
        return -1;
      } else if(book1.title == book2.title){
        return 0;
      } else{
        return 1;
      }
    })
  }

  sortByAuthor(){
    this.my_history.sort((book1, book2)=>{
      let a1 = book1.author.split(",")
      let a2 = book2.author.split(",")
      let author1 = a1[0].split(" ")
      let author2 = a2[0].split(" ")
      if(author1[author1.length-1] < author2[author2.length-1]){
        return -1;
      } else if(author1[author1.length-1] == author2[author2.length-1]){
        return 0;
      } else{
        return 1;
      }
    })
  }

  sortByBooked(){
    this.my_history.sort((book1, book2)=>{
      if(book1.booked < book2.booked){
        return 1;
      } else if(book1.booked == book2.booked){
        return 0;
      } else{
        return -1;
      }
    })
  }

  sortByReturned(){
    this.my_history.sort((book1, book2)=>{
      if(book1.returned < book2.returned){
        return 1;
      } else if(book1.returned == book2.returned){
        return 0;
      } else{
        return -1;
      }
    })
  }

}
