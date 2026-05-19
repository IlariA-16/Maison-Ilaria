import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { ProductService, Product } from '../../services/product';
import { WishlistService } from '../../services/wishlist'; // 1. Importa il servizio preferiti

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  allProducts: Product[] = [];       
  filteredProducts: Product[] = [];  
  selectedCategory: string = 'Tutti'; 
  searchTerm: string = '';            

  // 2. Inietta il WishlistService nel costruttore di fianco a quello dei prodotti
  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService 
  ) {}

  ngOnInit(): void {
    this.allProducts = this.productService.getProducts();
    this.filteredProducts = this.allProducts; 
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters(); 
  }

  onSearchChange(): void {
    this.applyFilters(); 
  }

  applyFilters(): void {
    this.filteredProducts = this.allProducts.filter(product => {
      const matchCategory = this.selectedCategory === 'Tutti' || product.category === this.selectedCategory;
      const matchSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }

  // 3. NUOVA FUNZIONE: Chiama il servizio per aggiungere o rimuovere il capo dai preferiti
  toggleFavorite(product: Product): void {
    this.wishlistService.toggleWishlist(product);
  }

  // 4. NUOVA FUNZIONE: Controlla se il capo ha il cuoricino attivo per colorarlo nell'HTML
  isFavorite(productId: number): boolean {
    return this.wishlistService.isInWishlist(productId);
  }
}
