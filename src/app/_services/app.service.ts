import {Injectable} from '@angular/core';
import { Http, Headers } from '@angular/http';
import {FlashMessagesService} from 'angular2-flash-messages/module';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  API: String = 'http://localhost:4201/';

  constructor(private http: Http, private flashMessage: FlashMessagesService) {}


  addWord(word) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.API + 'add', word, {
      headers: headers
    }).map(res => res.json());
  }

  getAll() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.API + 'getAll', {
        headers: headers
      })
      .map(res => res.json());
  }


  deleteWord(word) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.delete(this.API + 'delete/' + word._id, {
        headers: headers
      })
      .map(res => res.json());
  }

  showFlashMessage(title: string, classes: string, timeout: number) {
    this.flashMessage.show(title, {cssClass: classes, timeout: timeout});
  }

}
