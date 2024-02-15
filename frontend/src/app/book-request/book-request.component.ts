import { Component, OnInit } from '@angular/core';
import { BookRequest } from '../models/book_request';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-request',
  templateUrl: './book-request.component.html',
  styleUrls: ['./book-request.component.css']
})
export class BookRequestComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBookRequests().subscribe((resp: BookRequest[])=>{
      this.book_requests = resp
    })
  }

  book_requests: BookRequest[] = []

  addBook(book){
    if(book.image == null) book.image = "knjiga_podrazumevano.jpg"
 
    this.bookService.updateBookRequest(book.title, book.person).subscribe((resp=>{

      this.bookService.addBook(book.title, book.author, book.genre, book.publisher, 
        book.year, book.language, book.image).subscribe(resp=>{
        alert("Knjiga je dodata u biblioteku.")
        window.location.reload();
      })
      
    })) 
  }

}
