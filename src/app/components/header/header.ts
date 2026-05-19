import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header { // Controlla se la tua classe si chiama Header o HeaderComponent
  constructor(private cartService: CartService) {}

  // Funzione che l'HTML userà per mostrare quanti oggetti ci sono nel carrello
  getCartCount(): number {
    return this.cartService.getItems().length;
  }
}
