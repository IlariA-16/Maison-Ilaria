import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Lista dei prodotti aggiunti al carrello
  private cartItems: Product[] = [];

  // Aggiunge un vestito al carrello
  addToCart(product: Product) {
    this.cartItems.push(product);
  }

  // NUOVA FUNZIONE: Rimuove un singolo prodotto dal carrello in base alla sua posizione
  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }

  // Ritorna la lista degli elementi nel carrello
  getItems(): Product[] {
    return this.cartItems;
  }

  // Calcola il prezzo totale del carrello
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  // Svuota completamente il carrello
  clearCart() {
    this.cartItems = [];
    return this.cartItems;
  }
}
