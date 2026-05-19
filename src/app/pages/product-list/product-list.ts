import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 1. FONDAMENTALE: Importa FormsModule per gestire la barra di ricerca
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // 2. Aggiunto FormsModule qui dentro
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  allProducts: Product[] = [];       // Contiene l'intero catalogo fisso
  filteredProducts: Product[] = [];  // Contiene solo i prodotti visibili a schermo
  selectedCategory: string = 'Tutti'; // Traccia quale filtro per categoria è attivo
  searchTerm: string = '';            // 3. Memorizza il testo digitato dall'utente nella barra

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.allProducts = this.productService.getProducts();
    this.filteredProducts = this.allProducts; // All'inizio mostriamo tutto il catalogo
  }

  // Si attiva quando l'utente clicca sui bottoni delle categorie
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters(); // Esegue il controllo combinato
  }

  // Si attiva istantaneamente ogni volta che l'utente scrive o cancella una lettera
  onSearchChange(): void {
    this.applyFilters(); // Esegue il controllo combinato
  }

  // 4. LOGICA COMBINATA: Filtra contemporaneamente per Categoria E per Nome del vestito
  applyFilters(): void {
    this.filteredProducts = this.allProducts.filter(product => {
      // Controlla la corrispondenza della categoria selezionata
      const matchCategory = this.selectedCategory === 'Tutti' || product.category === this.selectedCategory;
      // Controlla se il nome del prodotto contiene le lettere cercate (senza distinzione tra maiuscole e minuscole)
      const matchSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchCategory && matchSearch;
    });
  }
}
