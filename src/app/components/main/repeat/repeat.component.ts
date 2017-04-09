import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../../_services/app.service';

@Component({
  selector: 'app-repeat',
  templateUrl: './repeat.component.html',
  styleUrls: ['./repeat.component.css']
})
export class RepeatComponent implements OnInit {
  @Input() words: any[];

  
  sections  = [
    {
      section: "all",
      title: "Все слова",
      active: true
    },
    {
      section: "eng-ru",
      title: "Английский -> Русский",
      active: false
    },
    {
      section: "ru-eng",
      title: "Русский -> Английский",
      active: false
    }
  ];
  constructor(private appService: AppService) {
  }

  ngOnInit() {
    
  }

   onTabClick(sectionToogle){
      this.sections.find((section) => section.active == true).active = false;
      this.sections.find((section) => section == sectionToogle).active = true;
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

getAllWords() {
    this.appService.getAll().subscribe(words => this.words = words);
  }


}
