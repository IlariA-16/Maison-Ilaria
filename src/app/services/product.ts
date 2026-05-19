import { Injectable } from '@angular/core';

// Definiamo la struttura dati di un singolo capo d'abbigliamento
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number; // <--- AGGIUNTO: Quantità disponibile in magazzino
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Il catalogo ufficiale di Maison Ilaria con lo stato delle scorte aggiornato
  private products: Product[] = [
    {
      id: 1,
      name: 'Cappotto Minimal Lana',
      price: 189.99,
      category: 'Donna',
      image: 'assets/cappotto.webp', 
      description: 'Cappotto elegante dal taglio sartoriale contemporaneo, perfetto per la stagione fredda.',
      stock: 5 // Disponibile
    },
    {
      id: 2,
      name: 'T-Shirt Luxury',
      price: 45.00,
      category: 'Donna',
      image: 'assets/tshirt.webp',
      description: 'T-shirt in cotone biologico pesante con vestibilità oversize rilassata.',
      stock: 0 // <--- ESAURITO (Impostato a 0 per il test)
    },
    {
      id: 3,
      name: 'Occhiali da Sole Maison',
      price: 120.00,
      category: 'Accessori',
      image: 'assets/occhiali.webp',
      description: 'Protezione UV totale con montatura geometrica nera in acetato lucido.',
      stock: 4 // Disponibile
    },
    {
      id: 4,
      name: 'Borsa a Mano Minimalist',
      price: 210.00,
      category: 'Accessori',
      image: 'assets/borsa.webp',
      description: 'Borsa in vera pelle con linee pulite e chiusura magnetica a scomparsa.',
      stock: 0 // <--- ESAURITO (Impostato a 0 per il test)
    }
  ];

  // Funzione che restituisce tutti i vestiti alla pagina della collezione
  getProducts(): Product[] {
    return this.products;
  }

  // Funzione che cerca un singolo vestito per la pagina dei dettagli
  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
