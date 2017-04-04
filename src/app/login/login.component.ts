import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { AuthService } from '../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private authService: AuthService,
              private flashMessage: FlashMessagesService,
              private router: Router) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['']);
    }
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in', {cssClass: 'notification is-success', timeout: 5000});
        this.router.navigate(['']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'notification is-danger', timeout: 5000});
      }
    });
  }

}
