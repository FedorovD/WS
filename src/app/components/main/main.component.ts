import { Component, OnInit } from '@angular/core';

import { AppService } from '../../_services/app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  words: any[];
  user: any;
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

  constructor(private appService: AppService) {
    this.getAllWords();

    this.user = 'turevs';
  }
   ngOnInit() {
  }


  onTabClick(sectionToogle){
      this.sections.find((section) => section.active == true).active = false;
      this.sections.find((section) => section == sectionToogle).active = true;
  }

  addWord(word) {
    this.appService.addWord(word).subscribe(res => {
      if (res.success === true) {
         this.getAllWords();
        }});
  }

  getAllWords() {
    this.appService.getAll().subscribe(words => this.words = words);
  }

   deleteWord(word) {

    if (this.words.indexOf(word) === -1) console.log('ERROR  app.component | func: deleteWord()');
    else {
    this.appService.deleteWord(word).subscribe(res => {
      if (res.success === true) {
        this.getAllWords();
      }
    });
    }
  }

}
