import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Seccion1 } from './seccion-1/seccion-1';
import { Seccion2 } from './seccion-2/seccion-2';
import { Seccion3 } from './seccion-3/seccion-3';
import { ComponenteComentarios } from './componente-comentarios/componente-comentarios';
import { Footer } from './footer/footer';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    Navbar,
    Seccion1,
    Seccion2,
    Seccion3, 
    ComponenteComentarios,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular_web_personal');
}
