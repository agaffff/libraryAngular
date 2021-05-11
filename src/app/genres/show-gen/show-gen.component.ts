import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/genre';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-gen',
  templateUrl: './show-gen.component.html',
  styleUrls: ['./show-gen.component.css'],
  providers: [SharedService]

})
export class ShowGenComponent implements OnInit {
  
  genre?: Genre;

  genres: Genre[] = [];
  
  VisibleAddEditGen: boolean = false;
  

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.refreshGenrList();
  }
  
  //Получаем все жанры из БД
  refreshGenrList() {
    this.service.getDataGenres().subscribe(data => {
      this.genres = data;
    });
  }

  //Скрываем форму редактирования жанров
  hideFormEdit() {
    this.VisibleAddEditGen = false;
    this.genre = undefined;
  }

  //поиск жанра по id и вызов формы редактирования жанров
  editGenre(id: number){
    this.genre= this.genres.find(gen => gen.id == id)
    this.visibleFormEdit();
  }

  //отображение формы редактирования жанров
  visibleFormEdit() {
    this.VisibleAddEditGen = true;
  }
  deleteGenre(id:any) {
    this.service.deleteGenre(id)
  }
}
