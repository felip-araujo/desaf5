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

  constructor (private ApiPostService: ApiPostService){}
  ngOnInit(): void {
    this.ApiPostService.getPosts(1).subscribe((data) => {
      console.log(data);
    });

    this.ApiPostService.getComentarios(1).subscribe((data) => {
      console.log('Comentários do Post 1:', data);
    });

  }
}
