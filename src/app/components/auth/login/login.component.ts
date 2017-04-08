
import { AuthService } from '../../../_services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  @Output() login: EventEmitter<any> = new EventEmitter;

  constructor(private authService: AuthService,
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

    this.login.emit(user);

   
  }

}
