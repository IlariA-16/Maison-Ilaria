import { Injectable } from '@angular/core';
import { Product } from './product';



// Definiamo la struttura di un elemento del carrello con la sua quantità
export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Ora l'array conterrà oggetti di tipo CartItem
  private cartItems: CartItem[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('maison_ilaria_cart');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
      }
    }
  }

  // Registra lo stato attuale dei dati nel localStorage
  private saveToLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('maison_ilaria_cart', JSON.stringify(this.cartItems));
    }
  }

  // Se il prodotto esiste già aumenta la quantità, altrimenti lo aggiunge con quantità 1
  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.saveToLocalStorage();
  }

  // Aumenta la quantità direttamente dal carrello (+1)
  incrementQuantity(index: number) {
    this.cartItems[index].quantity += 1;
    this.saveToLocalStorage();
  }

  // Diminuisce la quantità (-1). Se arriva a 0, rimuove il prodotto dal carrello
  decrementQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
    } else {
      this.cartItems.splice(index, 1);
    }
    this.saveToLocalStorage();
  }

  // Rimuove l'intera riga del prodotto dal carrello
  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.saveToLocalStorage();
  }

  // Restituisce gli elementi del carrello aggiornati
  getItems(): CartItem[] {
    return this.cartItems;
  }

  // Calcola il prezzo totale moltiplicando il costo del capo per la sua quantità
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  // Calcola la somma di tutte le quantità per aggiornare il contatore dell'Header
  getTotalCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // Svuota tutto il carrello e pulisce la memoria locale
  clearCart() {
    this.cartItems = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('maison_ilaria_cart');
    }
    return this.cartItems;
  }
}
