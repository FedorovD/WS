import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  API: String = 'http://localhost:4201/';
  authToken: any;
  constructor(private http: Http, private flashMessage: FlashMessagesService) { }


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

  getGlobalCollections() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.API + 'collections/getGlobalCollections', {
      headers: headers
    })
      .map(res => res.json());
  }
  getOwnCollections() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.API + 'users/getOwnCollections', {
      headers: headers
    })
      .map(res => res.json());
  }
  getAddedCollections() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.API + 'users/getAddedCollections', {
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

  createOwnCollection(collection) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.API + 'users/createOwnCollection', collection, {
      headers: headers
    })
      .map(res => res.json());
  }

  subscribeToCollection(collection_id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let query = { collection_id: collection_id };
    return this.http.post(this.API + 'users/subscribeToCollection', query, {
      headers: headers
    })
      .map(res => res.json());
  }

  unsubscribeToCollection(collection_id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let query = { collection_id: collection_id };
    return this.http.post(this.API + 'users/unsubscribeToCollection', query, {
      headers: headers
    })
      .map(res => res.json());
  }

  deleteOwnCollection(collection_id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let query = { collection_id: collection_id };
    return this.http.post(this.API + 'users/deleteOwnCollection', query, {
      headers: headers
    })
      .map(res => res.json());
  }


  addWordInOwnCollection(word, collection_id) {
    // let headers = new Headers();
    // this.loadToken();
    // headers.append('Authorization', this.authToken);
    // headers.append('Content-Type', 'application/json');
    // let query = { collection_id: collection_id };
    // return this.http.post(this.API + 'users/deleteOwnCollection', query, {
    //   headers: headers
    // })
    //   .map(res => res.json());
  }
  showFlashMessage(title: string, classes: string, timeout: number) {
    this.flashMessage.show(title, { cssClass: classes, timeout: timeout });
  }



  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}
