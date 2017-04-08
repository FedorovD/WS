import { AuthService } from '../../../_services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: String;
  email: String;
  password: String;
  @Output() register: EventEmitter<any> = new EventEmitter;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['']);
    }
  }

  onRegisterSubmit() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.register.emit(user);

   
  }

}
