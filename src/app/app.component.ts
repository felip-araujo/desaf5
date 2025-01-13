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
    // Enviar a requisição PUT para atualizar o post na API
    this.ApiPostService.updatePost(this.currentPost).subscribe(
      (updatedPost) => {
        // Atualizar a lista de posts localmente
        const index = this.postsComComentarios.findIndex(
          (post) => post.id === this.currentPost.id
        );
        if (index !== -1) {
          this.postsComComentarios[index] = { ...updatedPost }; // Atualizando post na lista
          this.posts[index] = { ...updatedPost }; // Atualizando post também na lista original
        }

        // Fechar o modal de edição
        this.closeEditModal();
      },
      (error) => {
        console.error('Erro ao atualizar o post:', error);
      }
    );
  }

  // Excluir um post
  deletePost(index: number) {
    this.postsComComentarios.splice(index, 1);
  }
}
