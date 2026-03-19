import { CommonModule } from '@angular/common';
import { Component, signal, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    PdfViewerModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  @ViewChild('menuContainer') menuContainer!: ElementRef;
  protected readonly title = signal('malfuzatehayder');
  searchText = '';
  user: any;
  menuOpen = false;

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  constructor(private auth: AuthService, private router: Router, private eRef: ElementRef) {}
  
  ngOnInit() {
  this.auth.onUserChange((user) => {
    this.user = user;
  });
}

  logout() {
    this.menuOpen = false;
    this.auth.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

@HostListener('document:click', ['$event'])
clickOutside(event: any) {
  if (!this.menuContainer) return;

  if (!this.menuContainer.nativeElement.contains(event.target)) {
    this.menuOpen = false;
  }
}
}