import {FlashMessagesService} from 'angular2-flash-messages/module';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  API: String = 'http://localhost:4201/';

  constructor(private http: Http, private flashMessage: FlashMessagesService) { }


  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.API + 'users/register', user, {headers: headers})
    .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.API + 'users/authenticate', user, {headers: headers})
                                                                                    .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.API + 'users/profile', {headers: headers})
                                                                        .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired();
  }

  getAdminRights() {
    let headers = new Headers();
    let rights;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    
    return this.http.get(this.API + 'users/profile', {headers: headers})
                                                                        .map(res => res.json().user.rights)
                                                                        .map((rights)=>{
                                                                          if(rights == 0) return true;
                                                                          else{
                                                                            this.flashMessage.show('You are not allowed', {cssClass: 'notification is-danger', timeout: 3000});
                                                                            return false;  
                                                                        } 
                                                                        });
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


}