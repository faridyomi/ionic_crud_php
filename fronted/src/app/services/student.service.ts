import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  phone: number;
  class: string
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = "http://localhost/firstApi/api/students";
  constructor(private http: HttpClient) {

  }

  get( id : string){
    return this.http.get<[Student]>(this.url + '?id=' + id);
  }

  getAll(){
    return this.http.get<[Student]>(this.url);
  }

  create(student : Student){
    return this.http.post(this.url,student);
  }

  update(student : Student, id: string){
    return this.http.put(this.url + '?id=' + id,student);
  }

  remove(id: string){
    return this.http.delete(this.url + '?id=' +id);
  }

}
