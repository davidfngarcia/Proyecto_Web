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

  usuarios: any[] = [];  /** Lista de usuarios de la página actual (foto, nombre, país) */
  comentarios: any[] = []; /** Lista de comentarios de la página actual (cuerpo, likes) */
  limite: number = 4; // Cuántos elementos se muestran por página
  pagina: number = 0; // Página actual (empieza en 0)

  constructor(private cd: ChangeDetectorRef) { }

  /**
   * Carga la primera página de comentarios y usuarios.
   */
  ngOnInit(): void {

    this.mostrarTodo()

  }

  /**
   * Carga usuarios y comentarios en paralelo desde dummyjson.com.
   * Calcula el 'skip' según la página actual para la paginación.
   * Promise.all() lanza ambas peticiones al mismo tiempo,
   * lo que es más eficiente que hacerlas una por una.
   * @returns {Promise<void>}
   */
  async mostrarTodo(): Promise<void> {

    try {

      // Calcula cuántos registros saltar según la página actual
      // Ejemplo: página 0 → skip 0, página 1 → skip 4, página 2 → skip 8
      const skip = this.pagina * this.limite;

      // Lanza ambas peticiones al mismo tiempo y espera a que terminen
      const [Usuarios, Comentarios] = await Promise.all([
        // API de usuarios: trae 'limite' usuarios saltando 'skip'
        fetch(`https://dummyjson.com/users?limit=${this.limite}&skip=${skip}`),

        // API de comentarios: trae 'limite' comentarios saltando 'skip'
        fetch(`https://dummyjson.com/comments?limit=${this.limite}&skip=${skip}`)
      ])

      // Convierte ambas respuestas a formato JSON
      const dataUsuarios = await Usuarios.json();
      const dataComentarios = await Comentarios.json();

      // Guarda los datos en las propiedades del componente
      this.usuarios = dataUsuarios.users;
      this.comentarios = dataComentarios.comments;

      // Fuerza a Angular a actualizar la vista con los nuevos datos
      this.cd.detectChanges();

    } catch (error) {
      // Si hay error de red o de la API, lo muestra en consola
      console.log("Error", error);
    };
  }

   /**
   * Avanza a la siguiente página de comentarios.
   * Incrementa el contador de página y recarga los datos.
   * @returns {Promise<void>}
   */
    async siguiente(): Promise<void> {
    // Incrementa la página actual
    this.pagina++;
    // Recarga los datos con la nueva página
    await this.mostrarTodo();
  }

  /**
   * Retrocede a la página anterior de comentarios.
   * Solo retrocede si no estamos en la primera página (pagina > 0),
   * evitando así páginas con índice negativo.
   * @returns {Promise<void>}
   */
  async anterior(): Promise<void> {
     // Verifica que no estemos en la primera página
    if(this.pagina > 0){
      // Decrementa la página actual
      this.pagina--;
      // Recarga los datos con la página anterior
      await this.mostrarTodo();
    }
  }
}
