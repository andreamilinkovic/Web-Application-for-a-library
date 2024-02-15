import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
  }

  search_param: string
  search_genre: string[] = []
  search_from: string
  search_to: string

  search_by: string

  searched_books: Book[] = []

  search(){
    switch(this.search_by){
      case "basic":{
        this.searchByTitle_Author();
        break;
      }
      case "genre":{
        this.searchByGenre();
        break;
      }
      case "publisher":{
        this.searchByPublisher();
        break;
      }
      case "year":{
        this.searchByYear();
        break;
      }
    }
  }

  searchByTitle_Author(){
    this.bookService.searchByTitle_Author(this.search_param).subscribe((books: Book[])=>{
      this.searched_books = books;
    })
  }

  searchByGenre(){
    this.bookService.allBooks().subscribe((books: Book[])=>{
      this.searched_books = []
      let resp = books;
      for(let i = 0; i < resp.length; i++){
        for(let j = 0; j < this.search_genre.length; j++){
          let genre = resp[i].genre.filter(g => g.includes(this.search_genre[j]))
          if(genre.length > 0){
            this.searched_books[this.searched_books.length] = resp[i]
            break
          }
            
        }
      }
    })
  }

  searchByPublisher(){
    this.bookService.searchByPublisher(this.search_param).subscribe((books: Book[])=>{
      this.searched_books = books;
    })
  }

  searchByYear(){
    this.bookService.searchByYear(this.search_from, this.search_to).subscribe((books: Book[])=>{
      this.searched_books = books;
    })
  }

  book(id){
    localStorage.setItem("book", JSON.stringify(id));
    this.router.navigate(["book"]);
  }

}
