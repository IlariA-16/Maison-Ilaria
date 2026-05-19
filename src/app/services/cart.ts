import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Lista dei prodotti aggiunti al carrello
  private cartItems: Product[] = [];

  constructor() {
    // Quando l'app si accende, controlla se c'è un carrello salvato nella memoria del browser
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('maison_ilaria_cart');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
      }
    }
  }

  // Funzione interna per registrare lo stato attuale dei dati nel localStorage
  private saveToLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('maison_ilaria_cart', JSON.stringify(this.cartItems));
    }
  }

  // Aggiunge un vestito al carrello e aggiorna la memoria
  addToCart(product: Product) {
    this.cartItems.push(product);
    this.saveToLocalStorage(); // <--- Aggiunto il salvataggio automatico
  }

  // Rimuove un singolo prodotto dal carrello e aggiorna la memoria
  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.saveToLocalStorage(); // <--- Aggiunto il salvataggio automatico
  }

  // Ritorna la lista degli elementi nel carrello
  getItems(): Product[] {
    return this.cartItems;
  }

  // Calcola il prezzo totale del carrello
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  // Svuota completamente il carrello (es. dopo l'acquisto) e cancella la memoria
  clearCart() {
    this.cartItems = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('maison_ilaria_cart'); // <--- Cancella la memoria locale
    }
    return this.cartItems;
  }
}
