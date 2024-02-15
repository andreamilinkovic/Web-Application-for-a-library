import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { BookService } from '../services/book.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  constructor(private bookService: BookService, private imageService: ImageService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"))
  }

  user: User

  title: string
  author: string
  genre: string[] = []
  publisher: string
  year: string
  language: string
  image: string

  img_file

  genre_input: string[] = []

  message: string

  onFileSelected(event){
    const file = event.target.files[0];
    this.img_file = file
    this.image = file.name;
  }

  changeSelect(){
    if(this.genre_input.length <= 3)
      this.genre = this.genre_input
  }

  addBookRequest(){
    
    if(this.img_file == null){
      this.image = "knjiga_podrazumevano.jpg"
      this.bookService.addBookRequest(this.title, this.author, this.genre, this.publisher, this.year, 
        this.language, this.image, this.user.username).subscribe(resp=>{
        this.message = resp["message"]
      })
    }
    else{
      this.imageService.uploadImage(this.img_file).subscribe(resp=>{
        this.bookService.addBookRequest(this.title, this.author, this.genre, this.publisher, this.year, 
          this.language, this.image, this.user.username).subscribe(resp=>{
          this.message = resp["message"]
        })
      })
    }
    
  }

  addBook(){
    if(this.img_file == null){
      this.image = "knjiga_podrazumevano.jpg"
      this.bookService.addBook(this.title, this.author, this.genre, this.publisher, this.year, this.language, this.image).subscribe(resp=>{
        this.message = resp["message"]
        if(this.user.type == "admin")
          this.router.navigate(["about_books"])
      })
    }
    else{
      this.imageService.uploadImage(this.img_file).subscribe(resp=>{
        this.bookService.addBook(this.title, this.author, this.genre, this.publisher, this.year, this.language, this.image).subscribe(resp=>{
          this.message = resp["message"]
          if(this.user.type == "admin")
            this.router.navigate(["about_books"])
        })
      })
    }
  }
}
