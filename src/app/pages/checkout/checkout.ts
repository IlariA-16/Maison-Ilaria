import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
  currentStep: number = 1; // 1 = Spedizione, 2 = Pagamento, 3 = Ordine Ricevuto
  totalAmount: number = 0;

  // Dati di spedizione
  shippingData = {
    name: '',
    address: '',
    city: '',
    cap: ''
  };

  // Dati di pagamento
  paymentData = {
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.totalAmount = this.cartService.getTotalPrice();
  }

  // Controlla che i campi della spedizione siano compilati e il CAP abbia 5 cifre
  isShippingValid(): boolean {
    return this.shippingData.name.trim().length > 0 &&
           this.shippingData.address.trim().length > 0 &&
           this.shippingData.city.trim().length > 0 &&
           /^\d{5}$/.test(this.shippingData.cap.trim()); // Rimuove gli spazi invisibili alla fine
  }

  // Controlla che i dati della carta siano corretti (16 cifre, scadenza MM/AA, CVV di 3 cifre)
  isPaymentValid(): boolean {
    const cleanCard = this.paymentData.cardNumber.replace(/\s+/g, '');
    return /^\d{16}$/.test(cleanCard) && 
           /^\d{2}\/\d{2}$/.test(this.paymentData.expiry) && 
           /^\d{3}$/.test(this.paymentData.cvv); 
  }

  // Avanza allo step del pagamento
  goToPayment(): void {
    if (this.isShippingValid()) {
      this.currentStep = 2;
    }
  }

  // Torna indietro alla spedizione
  backToShipping(): void {
    this.currentStep = 1;
  }

  // Svuota il carrello, cancella la memoria locale e mostra la schermata di successo finale
  confirmOrder(): void {
    if (this.isPaymentValid()) {
      this.cartService.clearCart(); 
      this.currentStep = 3; 
    }
  }
}
