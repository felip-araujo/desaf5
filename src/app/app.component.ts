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
  isEditModalOpen = false; // Controle para o modal de edição
  currentPost: any = {}; // Post que está sendo editado

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

  // Abrir o modal de edição com os dados do post
  openEditModal(post: any) {
    this.currentPost = { ...post }; // Clonando os dados do post
    this.isEditModalOpen = true;
  }

  // Fechar o modal de edição
  closeEditModal() {
    this.isEditModalOpen = false;
  }

  // Salvar as edições feitas no post
  savePost() {
    // Atualizar o post na lista com os novos dados
    const index = this.postsComComentarios.findIndex(
      (post) => post.id === this.currentPost.id
    );
    if (index !== -1) {
      this.postsComComentarios[index] = { ...this.currentPost };
    }

    this.closeEditModal();
  }

  // Excluir um post
  deletePost(index: number) {
    this.postsComComentarios.splice(index, 1);
  }
}
