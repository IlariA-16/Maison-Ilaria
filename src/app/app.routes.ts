import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductList } from './pages/product-list/product-list';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'prodotti', component: ProductList },
  { path: 'prodotto/:id', component: ProductDetail },
  { path: 'carrello', component: Cart },
  { path: '**', redirectTo: '' } // Se l'utente sbaglia indirizzo, torna alla Home
];
