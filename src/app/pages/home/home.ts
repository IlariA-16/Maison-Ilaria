import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule], // Serve per far funzionare il bottone che porta allo shop
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
