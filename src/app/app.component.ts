import { Component, OnInit } from '@angular/core';
import { ApiPostService } from './api-post.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  title = 'Desaf5'

  posts: any[] = [];
  comentarios: any[] = [];

  constructor(private ApiPostService: ApiPostService) { }
  ngOnInit(): void {
    this.ApiPostService.getPosts(1).subscribe((data) => {
      this.posts = data;
    });

    this.ApiPostService.getComentarios(1).subscribe((data) => {
      this.comentarios = data;
    });

  }
}
