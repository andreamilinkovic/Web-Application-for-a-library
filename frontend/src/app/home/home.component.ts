import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.allBooks().subscribe((books: Book[])=>{
      this.all_books = books

      this.all_books.sort((book1, book2)=>{
        if(book1.booked < book2.booked){
          return 1;
        } else if(book1.booked == book2.booked){
          return 0;
        } else{
          return -1;
        }
      })
      
    })
  }

  all_books: Book[] = []

}
