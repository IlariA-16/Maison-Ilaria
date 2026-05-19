import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 1. FONDAMENTALE: Importa FormsModule per gestire i campi di input
import { ProductService, Product } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // 2. Aggiunto FormsModule qui dentro
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  product: Product | undefined;
  selectedSize: string = ''; // Memorizza la taglia scelta dall'utente
  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL']; // Taglie disponibili

  // Controllano la notifica toast a comparsa
  showNotification: boolean = false;
  notificationMessage: string = '';

  // 3. NUOVE VARIABILI: Per la gestione dell'email di avviso stock
  notifyEmail: string = '';

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

  // 4. NUOVA FUNZIONE: Controlla se l'email inserita per lo stockAlert è valida
  isNotifyEmailValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(this.notifyEmail);
  }

  // 5. NUOVA FUNZIONE: Si attiva al clic su "AVVISAMI" per i capi esauriti
  subscribeToStockAlert(): void {
    if (this.isNotifyEmailValid() && this.product) {
      // Usa la stessa notifica toast elegante per confermare l'iscrizione
      this.notificationMessage = `Richiesta registrata. Ti avviseremo appena il capo tornerà disponibile.`;
      this.showNotification = true;
      this.notifyEmail = ''; // Svuota il campo di testo

      // Nasconde la notifica dopo 4 secondi
      setTimeout(() => {
        this.showNotification = false;
      }, 4000);
    }
  }

  addToCart(): void {
    if (this.product) {
      // Se è un vestito (NON accessori) e la taglia manca, blocca l'acquisto
      if (this.product.category !== 'Accessori' && !this.selectedSize) {
        alert('Per favore, seleziona una taglia prima di aggiungere al carrello.');
        return;
      }
      
      const dettagliotaglia = this.product.category === 'Accessori' ? 'Taglia Unica' : `Taglia ${this.selectedSize}`;
      
      // Aggiungiamo il prodotto nel carrello
      this.cartService.addToCart(this.product);
      
      // Sostituiamo il vecchio alert con la comparsa della notifica personalizzata
      this.notificationMessage = `${this.product.name} (${dettagliotaglia}) aggiunto al carrello.`;
      this.showNotification = true;

      // Facciamo sparire la notifica automaticamente dopo 3 secondi
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    }
  }
}
