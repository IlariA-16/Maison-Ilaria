import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  // Struttura dati del messaggio
  formData = {
    name: '',
    email: '',
    message: ''
  };

  showSuccessNotification = false;

  // Funzione per validare l'email tramite codice
  isEmailValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(this.formData.email);
  }

  // Controlla se l'intero form è pronto per essere inviato
  isFormValid(): boolean {
    return this.formData.name.trim().length > 0 && 
           this.isEmailValid() && 
           this.formData.message.trim().length > 10; // Messaggio di almeno 10 caratteri
  }

  sendMessage(): void {
    if (this.isFormValid()) {
      this.showSuccessNotification = true;
      
      // Resetta il form dopo l'invio simulato
      this.formData = { name: '', email: '', message: '' };

      // Nasconde la notifica dopo 4 secondi
      setTimeout(() => {
        this.showSuccessNotification = false;
      }, 4000);
    }
  }
}
