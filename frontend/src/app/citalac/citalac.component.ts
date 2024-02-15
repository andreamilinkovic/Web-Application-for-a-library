import { guardedExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookRequest } from '../models/book_request';
import { Reservation } from '../models/reservation';
import { User } from '../models/user';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-citalac',
  templateUrl: './citalac.component.html',
  styleUrls: ['./citalac.component.css']
})
export class CitalacComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    // book of the day
    this.bookService.allBooks().subscribe((books: Book[])=>{
      this.book_of_the_day = books[Math.floor(Math.random()*books.length)];
      this.bookService.getGrade(this.book_of_the_day.id).subscribe((resp)=>{
        this.grade = resp["message"];
      })
    })

    this.user = JSON.parse(localStorage.getItem("user"))
    this.bookService.myRentedBooks(this.user.username).subscribe((books: Book[])=>{
      this.rented_books = books;
    })

    this.bookService.getMyAcceptedBooks(this.user.username).subscribe(((books: BookRequest[])=>{
      this.recommended_books = books;
    }))

    this.bookService.myAcceptedReservations(this.user.username).subscribe(async (reserv: Reservation[])=>{
      for(let i = 0; i < reserv.length; i++){
        console.log(reserv[i].book)
        let resp = <Book> await this.bookService.findBook(reserv[i].book).toPromise();
        this.my_reservations[i] = resp.title
      }
    })
  }

  book_of_the_day: Book
  rented_books: Book[] = []
  my_reservations: string[] = []
  recommended_books: BookRequest[] = []
  user: User

  grade: string

  isDeadlineSoon(book): boolean{
    let today = new Date()
    let line = new Date(book.deadline)
    line.setDate(line.getDate() - 2)
    let deadline = new Date(book.deadline)
    deadline.setDate(deadline.getDate() + 1);
    
    return today >= line && today <= deadline
  }

  isOverDeadline(book): boolean{
    let today = new Date()
    let deadline = new Date(book.deadline)

    return today > new Date(deadline.setDate(deadline.getDate() + 1))
  }

  maxRented(): boolean{
    return this.rented_books.length == 3
  }
      
}
