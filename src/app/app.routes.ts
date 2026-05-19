import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductList } from './pages/product-list/product-list';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Cart } from './pages/cart/cart';
import { Wishlist } from './pages/wishlist/wishlist';
import { About } from './pages/about/about';      
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'prodotti', component: ProductList },
  { path: 'prodotto/:id', component: ProductDetail },
  { path: 'preferiti', component: Wishlist },
  { path: 'carrello', component: Cart },
  { path: 'chi-siamo', component: About },
  { path: 'contatti', component: Contact }, 
  { path: '**', redirectTo: '' } // Se l'utente sbaglia indirizzo, torna alla Home
];
