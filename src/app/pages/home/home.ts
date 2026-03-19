import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/Book';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    PdfViewerModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  pageSize = 12;
  pageIndex = 0;
  books: Book[] = [];
  selectedBook: Book | undefined = undefined;
  zoom = 0.5;
  loadingPdf = false;

  searchText = '';
  categoryFilter = 'all';
  gestureHandler: any;
touchHandler: any;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

zoomIn() {
  this.zoom = Math.min(this.zoom + 0.2, 3); // max zoom
}

zoomOut() {
  this.zoom = Math.max(this.zoom - 0.2, 0.5); // min zoom
}

  filteredBooks() {
    return this.books.filter(book => {

      const matchesSearch =
        book.title?.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesCategory =
        this.categoryFilter === 'all' ||
        book.category === this.categoryFilter;

      return matchesSearch && matchesCategory;

    });
  }

 openReader(book: Book) {
  this.selectedBook = book;
  this.loadingPdf = true;
   this.enableTouchBlock();
}

closeReader() {
  this.selectedBook = undefined;
  this.loadingPdf = false;
  this.disableTouchBlock();
}

  filterCategory(category: string) {
    this.categoryFilter = category;
  }

  get paginatedBooks() {
    const start = this.pageIndex * this.pageSize;
    return this.filteredBooks().slice(start, start + this.pageSize);
  }

  onPageChange(event:any){
    this.pageIndex = event.pageIndex;
  }

  enableTouchBlock() {

  // iOS pinch zoom
  this.gestureHandler = (e: any) => e.preventDefault();

  document.addEventListener('gesturestart', this.gestureHandler);
  document.addEventListener('gesturechange', this.gestureHandler);
  document.addEventListener('gestureend', this.gestureHandler);

  // double tap zoom
  let lastTouchEnd = 0;

  this.touchHandler = (event: any) => {
    const now = new Date().getTime();

    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }

    lastTouchEnd = now;
  };

  document.addEventListener('touchend', this.touchHandler, false);
}

disableTouchBlock() {
  document.removeEventListener('gesturestart', this.gestureHandler);
  document.removeEventListener('gesturechange', this.gestureHandler);
  document.removeEventListener('gestureend', this.gestureHandler);

  document.removeEventListener('touchend', this.touchHandler);
}

}
