import { Router } from '@angular/router'; 
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../services/cart'; 

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItems: CartItem[] = []; 

  constructor(private cartService: CartService, private router: Router) {}

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

  // Ordina al servizio di aumentare di 1 unità il prodotto e aggiorna lo schermo
  increaseQty(index: number): void {
    this.cartService.incrementQuantity(index);
    this.cartItems = this.cartService.getItems();
  }

  // Ordina al servizio di diminuire di 1 unità il prodotto e aggiorna lo schermo
  decreaseQty(index: number): void {
    this.cartService.decrementQuantity(index);
    this.cartItems = this.cartService.getItems();
  }

  // CORRETTO: Naviga direttamente alla pagina di checkout reale senza svuotare anticipatamente i dati
  checkout(): void {
    this.router.navigate(['/checkout']); 
  }
}
