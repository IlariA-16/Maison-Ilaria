import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems: Product[] = [];

  constructor() {
    // Legge la memoria locale all'avvio dell'applicazione
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('maison_ilaria_wishlist');
      if (savedWishlist) {
        this.wishlistItems = JSON.parse(savedWishlist);
      }
    }
  }

  // Registra lo stato corrente dell'array nel localStorage del browser
  private saveToLocalStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('maison_ilaria_wishlist', JSON.stringify(this.wishlistItems));
    }
  }

  // Aggiunge o rimuove un prodotto (Funzione Toggle) e aggiorna la memoria
  toggleWishlist(product: Product): void {
    const index = this.wishlistItems.findIndex(item => item.id === product.id);
    if (index > -1) {
      this.wishlistItems.splice(index, 1); // Se c'era già, lo rimuove
    } else {
      this.wishlistItems.push(product); // Se non c'era, lo aggiunge
    }
    this.saveToLocalStorage(); // <--- Salva automaticamente ad ogni clic
  }

  // Controlla se un prodotto è nei preferiti (per colorare il cuoricino)
  isInWishlist(productId: number): boolean {
    return this.wishlistItems.some(item => item.id === productId);
  }

  getItems(): Product[] {
    return this.wishlistItems;
  }
}
