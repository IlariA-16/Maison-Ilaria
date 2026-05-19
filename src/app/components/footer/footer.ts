import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 1. FONDAMENTALE: Importa FormsModule

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule], // 2. Aggiungi FormsModule qui
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  newsletterEmail: string = '';
  showNewsletterSuccess: boolean = false;

  // Funzione per validare l'email al volo
  isEmailValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(this.newsletterEmail);
  }

  // Si attiva quando l'utente fa clic su INVIA
  subscribeNewsletter(event: Event): void {
    event.preventDefault(); // Impedisce alla pagina di ricaricarsi
    
    if (this.isEmailValid()) {
      this.showNewsletterSuccess = true;
      this.newsletterEmail = ''; // Svuota il campo di input

      // Fa sparire il messaggio di successo dopo 4 secondi
      setTimeout(() => {
        this.showNewsletterSuccess = false;
      }, 4000);
    } else {
      alert('Per favore, inserisci un indirizzo email valido.');
    }
  }
}
