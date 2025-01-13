import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiPostService {
  private ApiUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) { }
  getPosts(id: number): Observable<any> {
    const url = `${this.ApiUrl}/posts`
    return this.http.get(url);
  }

  getComentarios(id: number): Observable<any> {
    const url = `${this.ApiUrl}/comments`
    return this.http.get(url);
  }

}
