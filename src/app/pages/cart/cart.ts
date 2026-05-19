import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../services/cart'; // Modificato: importa CartItem insieme al servizio

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItems: CartItem[] = []; // Modificato: ora è un array di CartItem (prodotto + quantità)

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Recuperiamo i prodotti attualmente salvati nel servizio del carrello
    this.cartItems = this.cartService.getItems();
  }

  // Chiede al servizio il costo totale di tutti i capi moltiplicati per le loro quantità
  getTotal(): number {
    return this.cartService.getTotalPrice();
  }

  // Ordina al servizio di rimuovere l'intera riga del capo e aggiorna lo schermo
  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getItems(); // Rilegge i prodotti rimasti
  }

  // NUOVA FUNZIONE: Ordina al servizio di aumentare di 1 unità il prodotto e aggiorna lo schermo
  increaseQty(index: number): void {
    this.cartService.incrementQuantity(index);
    this.cartItems = this.cartService.getItems();
  }

  // NUOVA FUNZIONE: Ordina al servizio di diminuire di 1 unità il prodotto e aggiorna lo schermo
  decreaseQty(index: number): void {
    this.cartService.decrementQuantity(index);
    this.cartItems = this.cartService.getItems();
  }

  // Simula la chiusura dell'ordine
  checkout(): void {
    alert('Grazie per il tuo acquisto! Il tuo ordine Maison Ilaria è in fase di elaborazione.');
    this.cartItems = this.cartService.clearCart(); // Svuota il carrello dopo l'acquisto
  }
}
