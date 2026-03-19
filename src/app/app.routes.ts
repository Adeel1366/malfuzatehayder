import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    canActivate: [authGuard]
  },
  {
    path: 'book/:id',
    loadComponent: () =>
      import('./book-details/book-details').then(m => m.BookDetails),
      canActivate: [authGuard]
  },
  {
  path: 'login',
  loadComponent: () =>
    import('./pages/login/login').then(m => m.Login),
}
];