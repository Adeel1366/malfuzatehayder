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
    PdfViewerModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  pageSize = 12;
  pageIndex = 0;
  books: Book[] = [];
  selectedBook: Book | undefined = undefined;
  zoom = 0.4;

  searchText = '';
  categoryFilter = 'all';

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  zoomIn() {
  this.zoom += 0.2;
  }

  zoomOut() {
    if (this.zoom > 0.4) {
      this.zoom -= 0.2;
    }
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
  }

  closeReader() {
    this.selectedBook = undefined;
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

}
