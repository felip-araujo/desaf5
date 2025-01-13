import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiPostService {
  private ApiUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) { }
  getPosts(): Observable<any> {
    const url = `${this.ApiUrl}/posts`
    return this.http.get(url);
  }

  getComentarios(): Observable<any> {
    const url = `${this.ApiUrl}/comments`
    return this.http.get(url);
  }

  updatePost(post: any): Observable<any> {
    const url = `${this.ApiUrl}/posts/${post.id}`;
    return this.http.put(url, post); // Usando PUT para atualizar o post
  }

}
