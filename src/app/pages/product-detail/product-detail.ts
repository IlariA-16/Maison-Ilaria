import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  product: Product | undefined;
  selectedSize: string = ''; // Memorizza la taglia scelta dall'utente
  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL']; // Taglie disponibili

  // 1. Aggiungiamo le due variabili per controllare la notifica d'alta moda
  showNotification: boolean = false;
  notificationMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Leggiamo l'ID dall'URL e cerchiamo il prodotto corrispondente
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.product = this.productService.getProductById(id);
    }
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  addToCart(): void {
    if (this.product) {
      // 2. Se è un vestito (NON accessori) e la taglia manca, blocca l'acquisto
      if (this.product.category !== 'Accessori' && !this.selectedSize) {
        alert('Per favore, seleziona una taglia prima di aggiungere al carrello.');
        return;
      }
      
      // 3. Definiamo il testo in base al tipo di articolo
      const dettagliotaglia = this.product.category === 'Accessori' ? 'Taglia Unica' : `Taglia ${this.selectedSize}`;
      
      // Aggiungiamo il prodotto nel carrello
      this.cartService.addToCart(this.product);
      
      // 4. Sostituiamo il vecchio alert con la comparsa della notifica personalizzata
      this.notificationMessage = `${this.product.name} (${dettagliotaglia}) aggiunto al carrello.`;
      this.showNotification = true;

      // 5. Facciamo sparire la notifica automaticamente dopo 3 secondi
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    }
  }
}
  