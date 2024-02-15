import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { History } from '../models/history';
import { Review } from '../models/review';
import { User } from '../models/user';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    let id = JSON.parse(localStorage.getItem("book"));
    this.user = JSON.parse(localStorage.getItem("user"));

    this.bookService.findBook(id).subscribe((book: Book)=>{
      this.book = book;
      this.isBooked();
      this.getGrade();
      this.isRented();
      this.isCommented();
      
      this.title = book.title;
      this.author = book.author;
      this.genre = book.genre;
      this.publisher = book.publisher;
      this.year = book.year;
      this.language = book.language;
      this.image = book.image;
      this.in_stock = book.in_stock

    })
    this.bookService.myRentedBooks(this.user.username).subscribe((resp: History[])=>{
      if(resp.length != 0){
        this.rented_books = resp;
        this.overDeadline();
      }
    })
    this.bookService.bookReviews(id).subscribe((reviews: Review[])=>{
      this.book_reviews = reviews;
      this.book_reviews.sort((review1, review2)=>{
        if(review1.date < review2.date){
          return 1;
        } else if(review1.date == review2.date){
          return 0;
        } else{
          return -1;
        }
      })
    })

    this.comment = ""
  }

  title: string
  author: string
  genre: String[] = []
  publisher: string
  year: string
  language: string
  image: string
  in_stock: number

  book: Book
  user: User
  rented_books: History[] = []
  book_reviews: Review[] = []
  grade: string

  is_booked: boolean
  over_deadline: boolean
  is_commented: boolean
  is_rented: boolean

  stars: number[] = [1,2,3,4,5,6,7,8,9,10]

  comment: string
  grade_input: string

  isBooked() {
    this.bookService.isBooked(this.user.username, this.book.id).subscribe((resp: History)=>{
      if(resp)
        this.is_booked = true
      else
        this.is_booked = false
    })
  }

  overDeadline(){
    for(let i = 0; i < this.rented_books.length; i++){
      if(new Date(this.rented_books[i].deadline) < new Date()){
        this.over_deadline = true;
        return
      }
    }
    this.over_deadline = false;
  }

  isRented(){
    this.bookService.isRented(this.user.username, this.book.id).subscribe((resp: History)=>{
      if(resp)
        this.is_rented = true
      else
        this.is_rented = false
    })
  }

  isCommented(){
    this.bookService.isCommented(this.book.id, this.user.username).subscribe((resp: Review)=>{
      if(resp)
        this.is_commented = true
      else
        this.is_commented = false
    })
  }

  getGrade(){
    this.bookService.getGrade(this.book.id).subscribe((resp)=>{
      this.grade = resp["message"];
    })
  }

  addReview(){
    if(this.comment == "") return;
    this.bookService.addReview(this.book.id, this.user.username, this.comment, this.grade_input).subscribe(resp=>{
      alert(resp["message"]);
      window.location.reload()
    })
  }

  updateReview(){
    if(this.comment == "") return;
    this.bookService.updateReview(this.book.id, this.user.username, this.comment, this.grade_input).subscribe(resp=>{
      alert(resp["message"]);
      window.location.reload()
    })
  }

  zaduzi(){
    let period = Number(JSON.parse(localStorage.getItem("period")));
    if(period == null)
      period = 14;

    let today = new Date()
    let booked = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    let date = new Date()
    date.setDate(date.getDate() + period)
    let deadline = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    console.log(date)
    console.log(period)

    this.bookService.zaduzi(this.book.id, this.book.title, this.book.author, this.book.image, this.user.username, booked, deadline).subscribe((resp)=>{
      alert(resp["message"])
      this.ngOnInit();
    })
  }

  rezervisi(){
    this.bookService.rezervisi(this.book.id, this.user.username).subscribe((resp)=>{
      alert(resp["message"])
    })
  }

  updateBook(){
    this.router.navigate(["update_book"])
  }
}
