import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { MasonryModule } from 'angular2-masonry';


import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';


import { AuthGuard } from './_guards/auth.guard';

import { AppService } from './_services/app.service';
import { AuthService } from './_services/auth.service';
import { ValidateService } from './_services/validate.service';
import { HideCollectionPipe } from './_pipes/hide-collection.pipe';
import { InstantSearchPipe } from './_pipes/instant-search.pipe';
import { UserTagComponent } from './components/main/user-tag/user-tag.component';
import { MyComponent } from './components/main/my/my.component';
import { TranslateWordComponent } from './components/main/learn/translate-word/translate-word.component';
import { WordTranslateComponent } from './components/main/learn/word-translate/word-translate.component';
import { AudioWordComponent } from './components/main/learn/audio-word/audio-word.component';

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
    AuthComponent,
    HideCollectionPipe,
    InstantSearchPipe,
    LoginComponent,
    RegisterComponent,
    UserTagComponent,
    MyComponent,
    TranslateWordComponent,
    WordTranslateComponent,
    AudioWordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    MasonryModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AppService,
  AuthService,
  ValidateService,
  AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
