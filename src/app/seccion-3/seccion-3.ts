import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seccion-3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-3.html',
  styleUrl: './seccion-3.css',
})
export class Seccion3  implements OnInit{
  personajes: any[] = [];

  constructor (private cd: ChangeDetectorRef){}

  ngOnInit(): void {

    this.obtenerpersonajes()
  
  }

  async obtenerpersonajes(){

    try{

      const response =
        await fetch("https://superheroapi.com/api/fcf5a174259a59d1750de09069563792/search/bat")

      const data = 
      await response.json()

      console.log(data);

      this.personajes = data.results;

      this.cd.detectChanges();

    } catch (error) {

      console.log("Error de personajes" , error);

    }
  }
}
