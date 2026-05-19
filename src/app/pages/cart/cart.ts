import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';
import { Product } from '../../services/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Recuperiamo i prodotti attualmente salvati nel servizio del carrello
    this.cartItems = this.cartService.getItems();
  }

  // Chiede al servizio il costo totale di tutti i capi
  getTotal(): number {
    return this.cartService.getTotalPrice();
  }

  // Simula la chiusura dell'ordine
  checkout(): void {
    alert('Grazie per il tuo acquisto! Il tuo ordine Maison Ilaria è in fase di elaborazione.');
    this.cartItems = this.cartService.clearCart(); // Svuota il carrello dopo l'acquisto
  }
}
