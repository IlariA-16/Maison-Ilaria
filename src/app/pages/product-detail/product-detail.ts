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
      if (!this.selectedSize) {
        alert('Per favore, seleziona una taglia prima di aggiungere al carrello.');
        return;
      }
      // Aggiungiamo il prodotto usando il servizio del carrello
      this.cartService.addToCart(this.product);
      alert(`${this.product.name} (Taglia ${this.selectedSize}) aggiunto al carrello!`);
    }
  }
}
