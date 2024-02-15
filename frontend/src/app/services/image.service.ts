import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000"

  uploadImage(img_file){
    const formData = new FormData();
    formData.append('file', img_file);

    return this.http.post<any>('http://localhost:4000/file', formData);
  }
}
