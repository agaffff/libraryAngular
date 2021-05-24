import { Component, OnInit, TemplateRef } from '@angular/core';
import { Author } from 'src/app/author';
import { SharedService } from 'src/app/shared.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Book } from 'src/app/book';


@Component({
  selector: 'app-show-aut',
  templateUrl: './show-aut.component.html',
  styleUrls: ['./show-aut.component.css'],
  providers: [SharedService]
})
export class ShowAutComponent implements OnInit {

  author: any;

  authors: Author[] = [];
  books: Book[] = [];

  ModalTitle!: string;
  VisibleAddEditAut: boolean = false;
  loading: boolean = true;
  closeResult = '';
  modalRef!: BsModalRef;
  items!: any[];

  constructor(private service: SharedService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.refreshAutList()

  }

  //
  editAuthor(id: number) {
    this.author = this.authors.find(aut => aut.id == id)
    this.visibleFormEdit();
  }

  //получаем список авторов из authors.json
  refreshAutList() {
    this.service.getDataAuthors()
      .subscribe(data => {
        this.authors = data;
      });

    //console.log('Длина массива авторов: '+ this.authors.length);  
  }

  //скрываем форму добавления/реадктирования автора
  hideFormEdit() {
    this.VisibleAddEditAut = false;
    //this.refreshAutList();
  }

  getBooks(books: []) {
    if (books != null) {
      this.service.getDataBooksFilter(books).subscribe(data => {
        this.books = data;
      })
    }
  }



  closeClick() {
    this.VisibleAddEditAut = false;
    this.refreshAutList();
  }

  visibleFormEdit() {
    this.VisibleAddEditAut = true;
  }


  deleteAuthor(id: any) {
    this.service.deleteAuthor(id)
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  openModalDetails(template: TemplateRef<any>, books: []) {
    this.getBooks(books);
    this.modalRef = this.modalService.show(template);
  }

  cancel() {
    this.modalRef.hide();
  }
}

