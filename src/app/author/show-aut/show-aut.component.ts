import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/author';
import { SharedService } from 'src/app/shared.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-show-aut',
  templateUrl: './show-aut.component.html',
  styleUrls: ['./show-aut.component.css'],
  providers: [SharedService]
})
export class ShowAutComponent implements OnInit {

  author: any;
  
  authors: Author[] = [];

  ModalTitle!: string;
  VisibleAddEditAut: boolean = false;
  loading: boolean = true;
  closeResult = '';

  constructor(private service: SharedService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.refreshAutList()
          
  }

//
  editAuthor(id: number){
    this.author= this.authors.find(aut=>aut.id == id)
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


  

  closeClick() {
    this.VisibleAddEditAut = false;
    this.refreshAutList();
  }

  visibleFormEdit() {
    /*
    console.log("New author");
    this.author = {
      id: 0,
      lastName: "",
      firstName: "",
      middleName: "",
      birthday: ""
    }
    */
    this.VisibleAddEditAut = true;
  }
  

  /*
  fillDataAuthorForm(id: number) {
    this.visibleForm = true;
    this.author = this.authors.find((author: { id: number; })=>author.id ==id)

  }
  deleteAuthor(id: number) {
     this.author = this.service.deleteAuthor(id);
  }*/
  /*editClick(author:any){
    this.author=author;
    this.ModalTitle="";
    this.visibleForm=true;
  }*/
  deleteAuthor(id:any) {
    this.service.deleteAuthor(id)
  }
}

