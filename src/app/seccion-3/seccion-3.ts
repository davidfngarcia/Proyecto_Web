import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seccion-3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-3.html',
  styleUrl: './seccion-3.css',
})
export class Seccion3 implements OnInit {
  personajes: any[] = []; /** Lista completa de brawlers obtenida desde la API */
  rarezaSeleccionada: string = 'Todos'; /** Rareza activa para filtrar el grid. 'Todos' muestra todos */

  constructor(private cd: ChangeDetectorRef) {} //Fuerza la detección de cambios después de obtener los datos

  ngOnInit(): void {
    this.obtenerPersonajes();
  }

  async obtenerPersonajes() {
    try {
      const response = await fetch('https://api.brawlapi.com/v1/brawlers'); // Llamada a la API pública de Brawl Stars
      const data = await response.json(); // Convierte la respuesta a formato JSON
      this.personajes = data.list; // Guarda la lista de brawlers
      this.cd.detectChanges(); // Fuerza a Angular a actualizar la vista con los nuevos datos
    } catch (error) { // Si hay error de red o de la API, lo muestra en consola
      console.log("Error de personajes", error);
    }
  }

   /**
   * Extrae las rarezas únicas de todos los brawlers.
   * Usa Set para eliminar duplicados automáticamente.
   * Agrega 'Todos' al inicio como opción por defecto.
   * @returns {string[]} Lista de rarezas únicas con 'Todos' al inicio
   */
  getRarezas(): string[] { 
    return ['Todos', ...new Set(this.personajes.map(p => p.rarity.name))];
  }

    /**
   * Filtra los brawlers según la rareza seleccionada.
   * Si la rareza es 'Todos', devuelve la lista completa.
   * @returns {any[]} Lista de brawlers que coinciden con la rareza
   */
  getBrawlersFiltrados() {
    // Si está seleccionado 'Todos', no aplica filtro
    if (this.rarezaSeleccionada === 'Todos') return this.personajes;
    // Filtra solo los brawlers de la rareza seleccionada
    return this.personajes.filter(p => p.rarity.name === this.rarezaSeleccionada);
  }

  /**
   * Obtiene el color hexadecimal de una rareza desde la API.
   * Si no encuentra la rareza, devuelve blanco como color por defecto.
   * @param {string} rareza - Nombre de la rareza a buscar
   * @returns {string} Color en formato hexadecimal (ej: '#FF0000')
   */
  getRarezaColor(rareza: string): string {
     // Busca el primer brawler que tenga esa rareza
    const brawler = this.personajes.find(p => p.rarity.name === rareza);
    // Devuelve el color de la rareza o blanco si no se encuentra
    return brawler ? brawler.rarity.color : '#ffffff';
  }

   /**
   * Actualiza la rareza activa al hacer clic en un botón de filtro.
   * Esto hace que getBrawlersFiltrados() devuelva solo los brawlers
   * de esa rareza en el grid.
   * @param {string} rareza - Rareza seleccionada por el usuario
   */
  seleccionarRareza(rareza: string) {
    this.rarezaSeleccionada = rareza;
  }
}