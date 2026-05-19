import { Injectable } from '@angular/core';

// Definiamo come è fatto un singolo vestito o accessorio
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Il nostro catalogo di prodotti con immagini di alta qualità per la moda
  private products: Product[] = [
    {
      id: 1,
      name: 'Cappotto Minimal Lana',
      price: 189.99,
      category: 'Donna',
      image: 'https://unsplash.com',
      description: 'Cappotto elegante dal taglio sartoriale contemporaneo, perfetto per la stagione fredda.'
    },
    {
      id: 2,
      name: 'T-Shirt Urban Luxury',
      price: 45.00,
      category: 'Uomo',
      image: 'https://unsplash.com',
      description: 'T-shirt in cotone biologico pesante con vestibilità oversize rilassata.'
    },
    {
      id: 3,
      name: 'Occhiali da Sole Maison',
      price: 120.00,
      category: 'Accessori',
      image: 'https://unsplash.com',
      description: 'Protezione UV totale con montatura geometrica nera in acetato lucido.'
    },
    {
      id: 4,
      name: 'Borsa a Mano Minimalist',
      price: 210.00,
      category: 'Accessori',
      image: 'https://unsplash.com',
      description: 'Borsa in vera pelle con linee pulite e chiusura magnetica a scomparsa.'
    }
  ];

  // Funzione per prendere tutti i prodotti del catalogo
  getProducts(): Product[] {
    return this.products;
  }

  // Funzione per cercare un singolo prodotto tramite il suo ID
  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
