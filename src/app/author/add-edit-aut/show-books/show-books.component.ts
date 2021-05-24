import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Book } from 'src/app/book';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-books',
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.css']
})
export class ShowBooksComponent implements OnInit {
  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate!: TemplateRef<any> ;
  @ViewChild('editTemplate', { static: false }) editTemplate!: TemplateRef<any>;

  @Input() books: Book[]=[];
  
  editedBook!: Book;

  isNewRecord: boolean | undefined;
  statusMessage?: string;
  
  constructor(private service: SharedService) {
  }

  ngOnInit(): void {
  }

  // добавление книги
  addBook() {
    this.editedBook = new Book(0,"",0,0);
    this.books.push(this.editedBook);
    this.isNewRecord = true;
  }


  // редактирование книги
  editBook(book: Book) {
    this.editedBook = new Book(book.id, book.name, book.str, book.genre);
    console.log(this.editedBook);
  }

  deleteBook(bookId: number)
  {
    //Реализовать удаление из масива книги

  }

  // загружаем один из двух шаблонов
  loadTemplate(book: Book) {
    console.log('Книга из Грида -' +book);
    console.log('this.editedBook - '+ this.editedBook)

    if (this.editedBook && this.editedBook.id === book.id) {
      return this.editTemplate;
    } 
    else 
    {
      return this.readOnlyTemplate;
    }
  }

  // сохраняем пользователя
  saveBook() {
    if (this.isNewRecord) {
      // добавляем пользователя
      this.statusMessage = 'Книга успешно добавлена'
     // this.service.addBook(this.editedBook)
      
      this.isNewRecord = false;
      this.loadTemplate(new Book(-1,"",-1,-1))
      //this.editedBook = undefined;
    } 
    else 
    {
      // изменяем пользователя
      this.isNewRecord = false;
      this.statusMessage = 'Книга успешно обновлена';
      this.loadTemplate(new Book(-1,"",-1,-1))
      //this.service.updateBook(this.editedBook)
      //this.loadBooks();
      //this.editedBook = undefined;
    }

  }
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.books.pop();
      this.isNewRecord = false;
    }

    this.loadTemplate(new Book(-1,"",-1,-1))
    //this.editedBook = undefined;
  }
}
