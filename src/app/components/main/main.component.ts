import { Component, OnInit } from '@angular/core';

import { AppService } from '../../_services/app.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  words: any[];
  user: any;
  addedCollections: any[];
  sections  = [
    {
      section: "add",
      title: "Новое слово",
      active: true
    },
    {
      section: "repeat",
      title: "Повторять",
      active: false
    }
  ];

  constructor(private appService: AppService, private authService: AuthService) {
    this.getAllWords();

    this.authService.getProfile().subscribe(res => this.user = res.user.username);

    this.appService.getAddedCollections().subscribe(_collections => this.addedCollections = _collections.collections);
  }
   ngOnInit() {
  }


  onTabClick(sectionToogle){
      this.sections.find((section) => section.active == true).active = false;
      this.sections.find((section) => section == sectionToogle).active = true;
  }


getAllWords() {
    this.appService.getAll().subscribe(words => this.words = words);
  }



 addWord(word) {
    this.appService.addWord(word).subscribe(res => {
      if (res.success === true) {
         this.getAllWords();
        }});
  }


}
