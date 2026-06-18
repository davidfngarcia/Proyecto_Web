import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { error } from 'console';


@Component({
  selector: 'app-componente-comentarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './componente-comentarios.html',
  styleUrl: './componente-comentarios.css',
})

export class ComponenteComentarios implements OnInit {

  usuarios: any[] = [];
  comentarios: any[] = [];
  limite: number = 4;
  pagina: number = 0;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.mostrarTodo()

  }

  async mostrarTodo(): Promise<void> {

    try {

      const skip = this.pagina * this.limite;

      const [Usuarios, Comentarios] = await Promise.all([
        fetch(`https://dummyjson.com/users?limit=${this.limite}&skip=${skip}`),
        fetch(`https://dummyjson.com/comments?limit=${this.limite}&skip=${skip}`)
      ])

      const dataUsuarios = await Usuarios.json();
      const dataComentarios = await Comentarios.json();

      this.usuarios = dataUsuarios.users;
      this.comentarios = dataComentarios.comments;

      this.cd.detectChanges();

    } catch (error) {
      console.log("Error", error);
    };
  }

    async siguiente(): Promise<void> {
    this.pagina++;
    await this.mostrarTodo();
  }

  async anterior(): Promise<void> {
    if(this.pagina > 0){
      this.pagina--;
      await this.mostrarTodo();
    }
  }
}
