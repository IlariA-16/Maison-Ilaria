import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../services/wishlist';
import { Product } from '../../services/product';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule], // Attiva le funzioni per i prezzi e i link di navigazione
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist implements OnInit {
  favorites: Product[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    // Recupera tutti i vestiti a cui hai messo il cuoricino bordeaux
    this.favorites = this.wishlistService.getItems();
  }

  // Ti permette di togliere il preferito direttamente cliccando sul cuore in questa pagina
  removeFavorite(product: Product): void {
    this.wishlistService.toggleWishlist(product);
    this.favorites = this.wishlistService.getItems(); // Rinfresca la griglia all'istante
  }
}
