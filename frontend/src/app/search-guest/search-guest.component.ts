import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-search-guest',
  templateUrl: './search-guest.component.html',
  styleUrls: ['./search-guest.component.css']
})
export class SearchGuestComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    let search_param = localStorage.getItem("search_param")
    console.log(search_param)
    this.bookService.searchByTitle_Author(search_param).subscribe((books: Book[])=>{
      this.searched_books = books
      localStorage.removeItem("search_param")
    })
  }

  searched_books: Book[] = []

}
