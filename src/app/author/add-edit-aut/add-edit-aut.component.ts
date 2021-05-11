import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Author } from 'src/app/author';
import { Book } from 'src/app/book';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-aut',
  templateUrl: './add-edit-aut.component.html',
  styleUrls: ['./add-edit-aut.component.css']
})
export class AddEditAutComponent implements OnInit {

  @Input() author?: Author;
  @Output() formClosed: EventEmitter<any> = new EventEmitter();
  
  id: number = 0;
  firstName!: string;
  lastName!: string;
  middleName!: string;
  birthday!: string;
  books: Book[] = [];

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    if (this.author != undefined) {
      console.log(this.author)

      this.id = this.author.id;
      this.firstName = this.author.firstName;
      this.lastName = this.author.lastName;
      this.middleName = this.author.middleName;
      this.birthday = this.author.birthday;
      
      this.getBooks();
    }
    else 
    {//иначе новый автор
      console.log('автор  пустой'); 
      this.id = 0;
    }
  }

  getBooks()
  {
    this.service.getDataBooksFilter(this.author?.books).subscribe(data => {
      this.books = data;
    });
  }
  

  saveAuthor() {

    this.author = {
      id: this.id,
      lastName: this.lastName,
      firstName: this.firstName,
      middleName: this.middleName,
      birthday: this.birthday,
      books: []
    }

    if(this.id == 0)
    { 
      console.log('вызываем this.service.addAuthor'); 
      this.service.addAuthor(this.author);
    }
    else
    {
      console.log('вызываем this.service.updateAuthor'); 
      this.service.updateAuthor(this.author);
    }

    //вызываем emit() чтобы сработало наше событие и закрылась форма редактирования
    this.formClosed.emit();
  }
  onCancel(){
    //вызываем emit() чтобы сработало наше событие и закрылась форма редактирования
    this.formClosed.emit();
    //this.VisibleAddEditAut = false;
  }
}