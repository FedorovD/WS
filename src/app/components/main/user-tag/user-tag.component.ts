import { FlashMessage } from 'angular2-flash-messages/module/flash-message';
import { Component, OnInit, Input } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { AuthService } from '../../../_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-tag',
  templateUrl: './user-tag.component.html',
  styleUrls: ['./user-tag.component.css']
})
export class UserTagComponent implements OnInit {
  @Input() user: any;
  constructor(private authService: AuthService, private flashMessage: FlashMessagesService, private router: Router) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are logged out', {cssClass: 'notification is-success animated bounceInDown', timeout: 1000});
    this.router.navigate(['/auth']);
    return false;
  }

}
