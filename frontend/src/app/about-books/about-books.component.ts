import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-about-books',
  templateUrl: './about-books.component.html',
  styleUrls: ['./about-books.component.css']
})
export class AboutBooksComponent implements OnInit {

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.bookService.allBooks().subscribe((books: Book[])=>{
      this.all_books = books
    })

    this.period_flag = false;
    this.period = JSON.parse(localStorage.getItem("period"))
    if(this.period == null)
      this.period = 14
  }

  all_books: Book[] = []

  period_flag: boolean;
  period: number


  updateBook(book){
    localStorage.setItem("book", JSON.stringify(book))
    this.router.navigate(["update_book"])
  }

  deleteBook(book){
    this.bookService.deleteBook(book.id).subscribe((resp)=>{
      alert(resp["message"])
      window.location.reload();
    })
  }

  addBook(){
    this.router.navigate(["new_book"])
  }

  changePeriod(){
    this.period_flag = true;
  }

  definePeriod(){
    localStorage.removeItem("period")
    localStorage.setItem("period", JSON.stringify(this.period))
    window.location.reload()
  }

  dismiss(){
    window.location.reload()
  }
}
