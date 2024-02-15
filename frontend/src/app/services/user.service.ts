import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaxValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000"

  login(username, password){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/users/login`, data);
  }

  signup(username, password, firstname, lastname, address, tel, mail, image){
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      address: address,
      tel: tel,
      mail: mail,
      image: image
    }

    return this.http.post(`${this.uri}/users/signup`, data);
  }

  updateProfile(username, firstname, lastname, address, tel, mail, image, type){
    const data = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      address: address,
      tel: tel,
      mail: mail,
      image: image,
      type: type
    }

    return this.http.post(`${this.uri}/users/updateProfile`, data);
  }

  changePassword(username, old_password, new_password){
    const data = {
      username: username,
      old_password: old_password,
      new_password: new_password
    }

    return this.http.post(`${this.uri}/users/changePassword`, data);
  }

  allUsers(){
    return this.http.get(`${this.uri}/users/allUsers`);
  }

  registerUser(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/users/registerUser`, data);
  }

  blockUser(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/users/blockUser`, data);
  }

  unblockUser(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/users/unblockUser`, data);
  }

  deleteUser(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/users/deleteUser`, data);
  }
}
