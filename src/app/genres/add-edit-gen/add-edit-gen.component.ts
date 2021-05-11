import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Genre } from 'src/app/genre';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-add-edit-gen',
  templateUrl: './add-edit-gen.component.html',
  styleUrls: ['./add-edit-gen.component.css']
})
export class AddEditGenComponent implements OnInit {
  @Input() genre?: Genre;
  @Output() formClosed: EventEmitter<any> = new EventEmitter();
  
  name!: string;
  id!: number;

  constructor(private service:SharedService) { }

  ngOnInit(): void {
    console.log(this.genre)
    
    if(this.genre != undefined)
    {
      this.id = this.genre.id;
      this.name = this.genre.name
    }
    else
    {
      this.id = 0;
    }

  }

  saveGenre() {

    this.genre = {
      id: this.id,
      name: this.name,
    }

    if (this.id == 0) {
      console.log('Новый');
      console.log(this.genre);
      this.service.addGenre(this.genre);
    }
    else {
      console.log('Редактируем');
      console.log(this.genre)
      this.service.updateGenre(this.genre);
    }
    //вызываем emit() чтобы сработало наше событие и закрылась форма редактирования
    this.formClosed.emit();
  }

  onCancel() {
    //вызываем emit() чтобы сработало наше событие и закрылась форма редактирования
    this.formClosed.emit();
    //this.VisibleAddEditAut = false;
  }
}
