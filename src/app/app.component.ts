import { Component, OnInit } from '@angular/core';
import { ApiPostService } from './api-post.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  title = 'Lista de Posts'

  posts: any[] = [];
  comentarios: any[] = [];
  postsComComentarios: any[] = [];

  constructor(private ApiPostService: ApiPostService) { }

  ngOnInit(): void {
    this.ApiPostService.getPosts().subscribe((postsData) => {
      this.posts = postsData;

      this.ApiPostService.getComentarios().subscribe((comentariosData) => {
        this.comentarios = comentariosData;

        this.postsComComentarios = this.posts.map((post) => ({
          ...post,
          comentarios: this.comentarios.filter(
            (comentario) => comentario.postId === post.id
          ),

        }));
      });
    });

  }
}
