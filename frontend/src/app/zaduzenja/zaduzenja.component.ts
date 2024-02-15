import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { User } from '../models/user';
import { History } from '../models/history';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-zaduzenja',
  templateUrl: './zaduzenja.component.html',
  styleUrls: ['./zaduzenja.component.css']
})
export class ZaduzenjaComponent implements OnInit {

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.bookService.myRentedBooks(this.user.username).subscribe((resp: History[])=>{
      if(resp.length != 0){
        this.rented_books = resp;
      }
      else{
        this.message = "Nemate nijednu zaduzenu knjigu."
      }
    })
  }

  user: User
  rented_books: History[] = []

  message: string

  daysUntilDeadline(deadline){
    let date = new Date(deadline);
    let days = Math.floor((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
   // if(days < 0) {
      days += 1;
    //}
    return Math.abs(days);
  }

  overDeadline(deadline){
    let today = new Date();
    today.setDate(today.getDate() - 1);
    return new Date(deadline) < today;
  }

  book(id){
    localStorage.setItem("book", JSON.stringify(id));
    this.router.navigate(["book"]);
  }

  extendDeadline(id){
    let period = Number(JSON.parse(localStorage.getItem("period")));
    if(period == null)
      period = 14;

    this.bookService.extendDeadline(id, period).subscribe(async (resp)=>{
      //my_reservations

      let my_reservations
      let my_rented
      let my_book_info

      my_reservations = await this.bookService.myReservations(this.user.username).toPromise();
      for(let i = 0; i < my_reservations.length; i++){
        my_book_info = await this.bookService.findBook(my_reservations[i].book).toPromise();
        console.log("my_reservation: " + my_book_info.title)
        if(my_book_info.in_stock > 0){
          my_rented = await this.bookService.checkReservations(this.user.username, my_reservations[i].book).toPromise()
          if(my_rented != 0) {break;}
          //book, title, author, image, username, booked, deadline
          let today = new Date()
          let booked = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
          let date = new Date()
          date.setDate(date.getDate() + period)
          let deadline = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()

          await this.bookService.zaduzi(my_book_info.id, my_book_info.title, my_book_info.author, my_book_info.image, 
            this.user.username, booked, deadline).toPromise()
        }
      }
      this.ngOnInit();
    })
  }

  async razduzi(book){
    let period = Number(JSON.parse(localStorage.getItem("period")));
    if(period == null)
      period = 14;

    let my_reservations
    let my_rented
    let my_book_info
    
    let reservations
    let rented
    let book_info

    //razduzi
    reservations = await this.bookService.razduzi(book, this.user.username).toPromise()

    //other reservations
    if(reservations != null){
      for(let i = 0; i < reservations.length; i++){
        rented = await this.bookService.checkReservations(reservations[i].person, book).toPromise()

        if(rented.length == 0) {
          console.log("person: " + reservations[i].person + "-->accept")
          book_info = await this.bookService.findBook(book).toPromise();
          
          //book, title, author, image, username, booked, deadline
          let today = new Date()
          let booked = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
          let date = new Date()
          date.setDate(date.getDate() + period)
          let deadline = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()

          await this.bookService.zaduzi(book_info.id, book_info.title, book_info.author, book_info.image, 
            reservations[i].person, booked, deadline).toPromise()

          break;
        }
        else
          console.log("person: " + reservations[i].person  + "-->dismiss")
      }
    }

    //my_reservations
    my_reservations = await this.bookService.myReservations(this.user.username).toPromise();
    for(let i = 0; i < my_reservations.length; i++){
      my_book_info = await this.bookService.findBook(my_reservations[i].book).toPromise();
      console.log("my_reservation: " + my_book_info.title)
      if(my_book_info.in_stock > 0){
        my_rented = await this.bookService.checkReservations(this.user.username, my_reservations[i].book).toPromise()
        if(my_rented != 0) {break;}
        //book, title, author, image, username, booked, deadline
        let today = new Date()
        let booked = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
        let date = new Date()
        date.setDate(date.getDate() + period)
        let deadline = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()

        await this.bookService.zaduzi(my_book_info.id, my_book_info.title, my_book_info.author, my_book_info.image, 
          this.user.username, booked, deadline).toPromise()
      }
    }
    //refresh
    window.location.reload();
  }

}
