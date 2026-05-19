import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  allProducts: Product[] = [];       // Contiene l'intero catalogo fisso
  filteredProducts: Product[] = [];  // Contiene solo i prodotti visibili a schermo
  selectedCategory: string = 'Tutti'; // Traccia quale filtro è attivo in questo momento

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.allProducts = this.productService.getProducts();
    this.filteredProducts = this.allProducts; // All'inizio mostriamo tutto il catalogo
  }

  // Funzione che cambia il filtro in base al bottone cliccato
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    
    if (category === 'Tutti') {
      this.filteredProducts = this.allProducts;
    } else {
      this.filteredProducts = this.allProducts.filter(p => p.category === category);
    }
  }
}
