import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'book/:id',
    loadComponent: () =>
      import('./book-details/book-details').then(m => m.BookDetails)
  }
];