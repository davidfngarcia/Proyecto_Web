import { Component , OnInit , ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { error } from 'console';


@Component({
  selector: 'app-componente-comentarios',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './componente-comentarios.html',
  styleUrl: './componente-comentarios.css',
})

export class ComponenteComentarios implements OnInit {

  usuarios: any[] =[];
  comentarios: any[] =[];

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit(): void {

    this.mostrarTodo()
    
  }

  async mostrarTodo(){

    try{
      const [Usuarios , Comentarios ] = await Promise.all ([
        fetch ("https://dummyjson.com/users?limit=4"),
        fetch ("https://dummyjson.com/comments?limit=4")
      ])

      const dataUsuarios = await Usuarios.json();
      const dataComentarios = await Comentarios.json();

      this.usuarios = dataUsuarios.users;
      this.comentarios = dataComentarios.comments;

      this.cd.detectChanges();

    } catch(error){
      console.log("Error" , error);
    }
}}
