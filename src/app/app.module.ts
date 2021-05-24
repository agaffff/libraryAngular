import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorComponent } from './author/author.component';
import { AddEditAutComponent } from './author/add-edit-aut/add-edit-aut.component';
import { ShowAutComponent } from './author/show-aut/show-aut.component';
import { GenresComponent } from './genres/genres.component';
import { AddEditGenComponent } from './genres/add-edit-gen/add-edit-gen.component';
import {SharedService} from './shared.service';
import { ShowGenComponent } from './genres/show-gen/show-gen.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowBooksComponent } from './author/add-edit-aut/show-books/show-books.component';
import { AddEditBookComponent } from './author/add-edit-aut/add-edit-book/add-edit-book.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    AddEditAutComponent,
    ShowAutComponent,
    GenresComponent,
    AddEditGenComponent,
    ShowGenComponent,
    ShowBooksComponent,
    AddEditBookComponent
       
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ModalModule.forRoot()
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
