import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/main/add/add.component';
import { RepeatComponent } from './components/main/repeat/repeat.component';
import { LoginComponent } from './components/auth/login/login.component';

import { MasonryModule } from 'angular2-masonry';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { InstantSearchPipe } from './_pipes/instant-search.pipe';

import { AppService } from './_services/app.service';
import { AuthService } from './_services/auth.service';
import { ValidateService } from './_services/validate.service';

import { AuthGuard } from './_guards/auth.guard';
import { UserTagComponent } from './components/main/user-tag/user-tag.component';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/auth/register/register.component';


const appRoutes: Routes = [
    { path: '', component: MainComponent, canActivate: [AuthGuard]},
    { path: 'auth', component: AuthComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' },
];




@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddComponent,
    RepeatComponent,
    LoginComponent,
    InstantSearchPipe,
    UserTagComponent,
    AuthComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    MasonryModule,
    FlashMessagesModule
  ],
  providers: [AppService,
              AuthService,
              ValidateService,
              AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
