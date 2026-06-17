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
  personajes: any[] = [];
  rarezaSeleccionada: string = 'Todos';

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.obtenerPersonajes();
  }

  async obtenerPersonajes() {
    try {
      const response = await fetch('https://api.brawlapi.com/v1/brawlers');
      const data = await response.json();
      this.personajes = data.list;
      this.cd.detectChanges();
    } catch (error) {
      console.log("Error de personajes", error);
    }
  }

  getRarezas(): string[] {
    return ['Todos', ...new Set(this.personajes.map(p => p.rarity.name))];
  }

  getBrawlersFiltrados() {
    if (this.rarezaSeleccionada === 'Todos') return this.personajes;
    return this.personajes.filter(p => p.rarity.name === this.rarezaSeleccionada);
  }

  getRarezaColor(rareza: string): string {
    const brawler = this.personajes.find(p => p.rarity.name === rareza);
    return brawler ? brawler.rarity.color : '#ffffff';
  }

  seleccionarRareza(rareza: string) {
    this.rarezaSeleccionada = rareza;
  }
}