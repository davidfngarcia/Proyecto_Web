import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule], // Necesario para usar [ngClass]
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  menuAbierto: boolean = false; // Variable que controla si el menú está abierto o cerrado //

  toggleMenu(){
    this.menuAbierto = !this.menuAbierto; // Invierte el estado: si era false pasa a true y viceversa
  }
}
