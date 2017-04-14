import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../_services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { ValidateService } from './../../_services/validate.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  sections  = [
    {
      section: "login",
      title: "Вход",
      active: true
    },
    {
      section: "register",
      title: "Регистрация",
      active: false
    }
  ];
  constructor(private authService: AuthService,
              private flashMessage: FlashMessagesService,
              private router: Router,
              private validateService: ValidateService) { }

  ngOnInit() {
  }

    onTabClick(sectionToogle){
      this.sections.find((section) => section.active == true).active = false;
      this.sections.find((section) => section == sectionToogle).active = true;
  }

  loginSubmit(user: any) {


         // Validate Fields
    if (!this.validateService.validateLogin(user)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'notification is-danger animated bounceInDown', timeout: 3000});
      return false;
    }

    // // Validate Email
    // if (!this.validateService.validateEmail(user.email)) {
    //   this.flashMessage.show('Please use a validate email', {cssClass: 'notification is-danger animated bounceInDown', timeout: 3000});
    //   return false;
    // }



     this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in', {cssClass: 'notification is-success animated bounceInDown', timeout: 5000});
        this.router.navigate(['']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'notification is-danger animated bounceInDown', timeout: 5000});
      }
    });
  }


  registerSubmit(user: any) {
      // Validate Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'notification is-danger animated bounceInDown', timeout: 3000});
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please use a validate email', {cssClass: 'notification is-danger animated bounceInDown', timeout: 3000});
      return false;
    }



     this.authService.registerUser(user).subscribe(data => {
        if (data.success) {
        this.flashMessage.show('Registered success', {cssClass: 'notification is-success', timeout: 3000});
        }else {
        this.flashMessage.show('Something went wrong', {cssClass: 'notification is-danger', timeout: 3000});
      }
    });
  }

}
