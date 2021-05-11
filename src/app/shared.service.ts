import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getDataAuthors(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/authorlist');
  }

  addAuthor(val: any) {
    console.log(val);
    return this.http.post(this.APIUrl + '/authorlist', val).subscribe(
      data => {
        console.log('POST Request is successful ', data);
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  updateAuthor(val: any) {
    return this.http.patch(this.APIUrl + '/authorlist/' + val.id, val).subscribe(
      data => {
        console.log('PATCH Request is successful ', data);
      },
      error => {
        console.log('Error', error);
      });
  }

  deleteAuthor(val: any) {
    return this.http.delete(this.APIUrl + '/authorlist/' + val).subscribe(
      data => {
        console.log('DELETE Request is successful ', data);
      },
      error => {
        console.log('Error', error);
      });
  }

  getDataBooksFilter(val: []): Observable<any[]> {

    let params = '';
    val.forEach(element => {
      if (params == '')
        params = params + 'id=' + element
      else
        params = params + '&id=' + element
    });

    console.log(this.APIUrl + '/bookslist?' + params);
    if (params == '')
      return this.http.get<any>(this.APIUrl + '/bookslist?id=-1');
    return this.http.get<any>(this.APIUrl + '/bookslist?' + params);

    //Это заглушка которая получает все книжки
    return this.http.get<any>(this.APIUrl + '/bookslist');

  }

  getDataBooks(): Observable<any[]> {
    //Это заглушка которая получает все книжки
    return this.http.get<any>(this.APIUrl + '/bookslist/');

  }


  getDataGenres() {
    return this.http.get<any>(this.APIUrl + '/genreslist/');
  }

  addGenre(val: any) {
    return this.http.post(this.APIUrl + '/genreslist/', val).subscribe(
      data => {
        console.log('POST Request is successful ', data);
      },
      error => {
        console.log('Error', error);
      }
    );
  }
  updateGenre(val: any) {
    return this.http.patch(this.APIUrl + '/genreslist/' + val.id, val).subscribe(
      data => {
        console.log('PATCH Request is successful ', data);
      },
      error => {
        console.log('Error', error);
      });
  }
  deleteGenre(val: any) {
    //TODO: перед удалением сделать проверку не используется ли такой жанр в существующих книгах, если используется не удалять жанр
    return this.http.delete(this.APIUrl + '/genreslist/' + val).subscribe(
      data => {
        console.log('DELETE Request is successful ', data);
      },
      error => {
        console.log('Error', error);
      });
  }


}
