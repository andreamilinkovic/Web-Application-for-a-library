import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }
  
  uri = "http://localhost:4000"

  allBooks(){
    return this.http.get(`${this.uri}/books/allBooks`);
  }

  getGrade(id){
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/books/getGrade`, data);
  }

  myRentedBooks(person){
    const data = {
      person: person
    }

    return this.http.post(`${this.uri}/books/myRentedBooks`, data);
  }

  findBook(id){
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/books/findBook`, data);
  }

  myHistory(person){
    const data = {
      person: person
    }

    return this.http.post(`${this.uri}/books/myHistory`, data);
  }

  extendDeadline(id, period){
    const data = {
      id: id,
      period: period
    }

    return this.http.post(`${this.uri}/books/extendDeadline`, data);
  }

  searchByTitle_Author(param){
    const data = {
      param: param
    }

    return this.http.post(`${this.uri}/books/searchByTitle_Author`, data);
  }

  searchByPublisher(param){
    const data = {
      param: param
    }

    return this.http.post(`${this.uri}/books/searchByPublisher`, data);
  }
  
  searchByYear(from, to){
    const data = {
      from: from,
      to: to
    }

    return this.http.post(`${this.uri}/books/searchByYear`, data);
  }

  isBooked(username, id){
    const data = {
      username: username,
      id: id
    }

    return this.http.post(`${this.uri}/books/isBooked`, data);
  }

  isRented(username, id){
    const data = {
      username: username,
      id: id
    }

    return this.http.post(`${this.uri}/books/isRented`, data);
  }

  isCommented(book, username){
    const data = {
      book: book,
      username: username
    }

    return this.http.post(`${this.uri}/books/isCommented`, data);
  }

  bookReviews(id){
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/books/bookReviews`, data);
  }

  addReview(book, username, comment, grade){
    const data = {
      book: book,
      username: username,
      comment: comment,
      grade: grade
    }

    return this.http.post(`${this.uri}/books/addReview`, data);
  }

  updateReview(book, username, comment, grade){
    const data = {
      book: book,
      username: username,
      comment: comment,
      grade: grade
    }

    return this.http.post(`${this.uri}/books/updateReview`, data);
  }

  zaduzi(book, title, author, image, username, booked, deadline){
    const data = {
      book: book, 
      title: title, 
      author: author, 
      image: image, 
      username: username, 
      booked: booked, 
      deadline: deadline
    }

    return this.http.post(`${this.uri}/books/zaduzi`, data);
  }

  rezervisi(book, person){
    const data = {
      book: book, 
      person: person
    }

    return this.http.post(`${this.uri}/books/rezervisi`, data);
  }

  razduzi(book, person){
    const data = {
      book: book,
      person: person
    }

    return this.http.post(`${this.uri}/books/razduzi`, data);
  }

  myReservations(person){
    const data = {
      person: person
    }

    return this.http.post(`${this.uri}/books/myReservations`, data);
  }

  deleteReservations(person){
    const data = {
      person: person
    }

    return this.http.post(`${this.uri}/books/deleteReservations`, data);
  }

  myAcceptedReservations(person){
    const data = {
      person: person
    }

    return this.http.post(`${this.uri}/books/myAcceptedReservations`, data);
  }

  checkReservations(person, book){
    const data = {
      person: person,
      book: book
    }

    return this.http.post(`${this.uri}/books/checkReservations`, data);
  }

  bookReservations(book){
    const data = {
      book: book
    }

    return this.http.post(`${this.uri}/books/bookReservations`, data);
  }

  addBookRequest(title, author, genre, publisher, year, language, image, person){
    const data = {
      title: title,
      author: author,
      genre: genre,
      year: year,
      publisher: publisher,
      language: language,
      image: image,
      person: person
    }

    return this.http.post(`${this.uri}/books/addBookRequest`, data);
  }

  getMyAcceptedBooks(person){
    const data = {
      person: person
    }

    return this.http.post(`${this.uri}/books/getMyAcceptedBooks`, data);
  }

  addBook(title, author, genre, publisher, year, language, image){
    const data = {
      title: title,
      author: author,
      genre: genre,
      year: year,
      publisher: publisher,
      language: language,
      image: image
    }

    return this.http.post(`${this.uri}/books/addBook`, data);
  }

  updateBook(id, title, author, genre, publisher, year, language, image, in_stock){
    const data = {
      id: id,
      title: title,
      author: author,
      genre: genre,
      year: year,
      publisher: publisher,
      language: language,
      image: image,
      in_stock: in_stock
    }

    return this.http.post(`${this.uri}/books/updateBook`, data);
  }

  getBookRequests(){
    return this.http.get(`${this.uri}/books/getBookRequests`);
  }

  updateBookRequest(title, person){
    const data = {
      title: title,
      person:person
    }

    return this.http.post(`${this.uri}/books/updateBookRequest`, data);
  }

  deleteBook(id){
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/books/deleteBook`, data);
  }

}
