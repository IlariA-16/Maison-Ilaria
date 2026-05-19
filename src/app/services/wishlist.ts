import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems: Product[] = [];

  // Aggiunge o rimuove un prodotto (Funzione Toggle)
  toggleWishlist(product: Product): void {
    const index = this.wishlistItems.findIndex(item => item.id === product.id);
    if (index > -1) {
      this.wishlistItems.splice(index, 1); // Se c'era già, lo rimuove
    } else {
      this.wishlistItems.push(product); // Se non c'era, lo aggiunge
    }
  }

  // Controlla se un prodotto è nei preferiti (per colorare il cuoricino)
  isInWishlist(productId: number): boolean {
    return this.wishlistItems.some(item => item.id === productId);
  }

  getItems(): Product[] {
    return this.wishlistItems;
  }
}
