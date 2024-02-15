import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { History } from '../models/history';
import { User } from '../models/user';
import { BookService } from '../services/book.service';
import { ImageService } from '../services/image.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private bookService: BookService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));

    this.firstname = this.user.firstname
    this.lastname = this.user.lastname
    this.address = this.user.address
    this.tel = this.user.tel
    this.mail = this.user.mail
    this.image = this.user.image
    this.type = this.user.type

    this.message = ""

    this.update_flag = false;

    this.booksInYear();
    this.myGenres()
  }

  user: User
  update_flag: boolean

  firstname: string
  lastname: string
  address: string
  tel: string
  mail: string
  image: string
  type: string

  img_file

  message: string = ""

  setUpdate_flag(flag){
    this.update_flag = flag;   
  }

  onFileSelected(event){
    const file = event.target.files[0];
    this.img_file = file
    this.image = file.name;
  }

  updateProfile(){
    if(this.img_file == null){
      this.userService.updateProfile(this.user.username, this.firstname, this.lastname, this.address, this.tel, this.mail, this.image, this.type).subscribe((resp: User)=>{
        if(resp == null){
          this.message = "Korisnik sa zadatim mejlom vec postoji.";
        }
        else{
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(resp));
          this.ngOnInit();
        }   
      })
    }
    else{
      this.imageService.uploadImage(this.img_file).subscribe(resp=>{
        this.userService.updateProfile(this.user.username, this.firstname, this.lastname, this.address, this.tel, this.mail, this.image, this.type).subscribe((resp: User)=>{
          if(resp == null){
            this.message = "Korisnik sa zadatim mejlom vec postoji.";
          }
          else{
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(resp));
            this.ngOnInit();
          }   
        })
      })
    }
  }


  my_history: History[] = []
  books_per_month: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0]

  book_map: Map<string, number> = new Map()
  months: Map<number, string> = new Map([
    [1, "januar"],
    [2, "februar"],
    [3, "mart"],
    [4, "april"],
    [5, "maj"],
    [6, "jun"],
    [7, "jul"],
    [8, "avgust"],
    [9, "septembar"],
    [10, "oktobar"],
    [11, "novembar"],
    [12, "decembar"]
  ])

  async booksInYear(){
    this.my_history = <History[]> await this.bookService.myHistory(this.user.username).toPromise();

    let today = new Date()
    let date = (today.getFullYear()-1) + "-" + (today.getMonth()+1) + "-" + "31"

    this.my_history.forEach(b => {
      if(b.returned != "" && (new Date(b.returned) > new Date(date))){
        let book = b.returned.split("-");
        this.books_per_month[book[1]] = this.books_per_month[book[1]] + 1;
      }
    });

    console.log(date)
    let month_cnt = (Number((date.split("-"))[1]) + 1) % 12
    let year_str = Number((date.split("-"))[0])
    for(let i = 1; i <= 12; i++){
      if(month_cnt == 0) {
        month_cnt = 12;
        year_str = year_str + 1;
      }
      this.book_map.set(this.months.get(month_cnt) + "\n" + year_str.toString(), this.books_per_month[month_cnt]);
      month_cnt = (month_cnt + 1) % 12;
    }
  }

  asIsOrder() {
    return 0;
  }

  genre_map: Map<string, number> = new Map()

  async myGenres(){
    this.my_history = <History[]> await this.bookService.myHistory(this.user.username).toPromise();

    this.my_history.forEach(async b => {
      let book = <Book> await this.bookService.findBook(b.book).toPromise();

      book.genre.forEach(async g => {
        //console.log(g)
        if(!this.genre_map.has(<string>g))
          this.genre_map.set(<string>g, 0)

        let value = this.genre_map.get(<string>g);
        value++;
        await this.genre_map.set(<string>g, value);
      })

      /*console.log("map")
        this.genre_map.forEach((value: number, key: string) => {
          console.log(key, value);
        });*/
    })
  }

}
