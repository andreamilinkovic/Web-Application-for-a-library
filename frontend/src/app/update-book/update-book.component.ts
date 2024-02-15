import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  constructor(private bookService: BookService, private imageService: ImageService, private router: Router) { }

  ngOnInit(): void {
    let id = JSON.parse(localStorage.getItem("book"))

    this.bookService.findBook(id).subscribe((book: Book)=>{
      this.book = book

    this.title = this.book.title;
    this.author = this.book.author;
    this.genre_input = this.book.genre;
    this.genre = this.book.genre;
    this.publisher = this.book.publisher;
    this.year = this.book.year;
    this.language = this.book.language;
    this.image = this.book.image;
    this.in_stock = this.book.in_stock

    this.message = ""

    })
  }

  title: string
  author: string
  genre: String[] = []
  publisher: string
  year: string
  language: string
  image: string
  in_stock: number

  img_file

  book_reservations

  message: string

  genre_input: String[] = []

  book: Book

  onFileSelected(event){
    const file = event.target.files[0];
    this.img_file = file
    this.image = file.name;
  }

  changeSelect(){
    if(this.genre_input.length <= 3)
      this.genre = this.genre_input
  }

  updateBook(){
    let period = Number(JSON.parse(localStorage.getItem("period")));
    if(period == null)
      period = 14;

    if(this.img_file == null){
      this.bookService.updateBook(this.book.id, this.title, this.author, this.genre, this.publisher, this.year, this.language, this.image, this.in_stock).subscribe(async (resp: Book)=>{
        this.book_reservations = await this.bookService.bookReservations(this.book.id).toPromise();
          let n = resp.in_stock
          let rented
          for(let i = 0; i < this.book_reservations.length && n != 0; i++){
            rented = await this.bookService.checkReservations(this.book_reservations[i].person, this.book.id).toPromise()

            if(rented.length == 0) {
              
              //book, title, author, image, username, booked, deadline
              let today = new Date()
              let booked = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
              let date = new Date()
              date.setDate(date.getDate() + period)
              let deadline = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    
              await this.bookService.zaduzi(this.book.id, this.book.title, this.book.author, this.book.image, 
                this.book_reservations[i].person, booked, deadline).toPromise()

              n--;
            }
          }
        
        let user = JSON.parse(localStorage.getItem("user"))
        if(user.type == "admin")
          this.router.navigate(["about_books"])
          else{
            localStorage.removeItem("book")
            localStorage.setItem("book", JSON.stringify(resp.id))
            this.router.navigate(["book"])
          }
      })
    }
    else{
      this.imageService.uploadImage(this.img_file).subscribe(resp=>{
        this.bookService.updateBook(this.book.id, this.title, this.author, this.genre, this.publisher, this.year, this.language, this.image, this.in_stock).subscribe(async (resp: Book)=>{
          this.book_reservations = await this.bookService.bookReservations(this.book.id).toPromise();
          let n = resp.in_stock
          let rented
          for(let i = 0; i < this.book_reservations.length && n != 0; i++){
            rented = await this.bookService.checkReservations(this.book_reservations[i].person, this.book.id).toPromise()

            if(rented.length == 0) {
              
              //book, title, author, image, username, booked, deadline
              let today = new Date()
              let booked = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
              let date = new Date()
              date.setDate(date.getDate() + period)
              let deadline = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    
              await this.bookService.zaduzi(this.book.id, this.book.title, this.book.author, this.book.image, 
                this.book_reservations[i].person, booked, deadline).toPromise()

              n--;
            }
          }

          let user = JSON.parse(localStorage.getItem("user"))
          if(user.type == "admin")
            this.router.navigate(["about_books"])
            else{
              localStorage.removeItem("book")
              localStorage.setItem("book", JSON.stringify(resp.id))
              this.router.navigate(["book"])
            }
        })
      })
    }
  }

  dismiss(){
    let user = JSON.parse(localStorage.getItem("user"))
    if(user.type == "admin")
      this.router.navigate(["about_books"])
    else
      this.router.navigate(["book"])
  }

}
