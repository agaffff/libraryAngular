import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/book';

@Component({
  selector: 'app-show-books',
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.css']
})
export class ShowBooksComponent implements OnInit {

  @Input() books!: Book[];

  constructor() { }

  ngOnInit(): void {

  }

  editBook(id: any)
  {}

  deleteBook(id: any)
  {}

}
