import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {FlashMessagesService} from 'angular2-flash-messages/module';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService) {}

    canActivate() {
        if (this.authService.loggedIn()) {
            return true;
        } else {
            this.flashMessage.show('Please, sign in', {cssClass: 'notification is-danger', timeout: 3000});
            this.router.navigate(['/auth']);
            return false;
        }
    }
}

