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
  addedCollections: any[] = [];
  ownCollections: any[] = [];

  sections  = {
    menu: {
      active: true
    },
    trainings: [
    {
      section: "all-my-words",
      title: "Все мои слова",
      description: "Просмотр, добавление, удаление и редактирование своего набора слов.",
      img: "./assets/whale.svg",
      block: true,
      active: false
    },
    {
      section: "word-translate",
      title: "Слово-перевод",
      description: "Тренировка “Слово-перевод” улучшает навык перевода слов с английского на ваш родной язык, помогая лучше понимать английские тексты и речь.",
      img: "./assets/whale.svg",
      block: false,
      active: false
    },
    {
      section: "translate-word",
      title: "Перевод-слово",
      description: "Тренировка “Перевод-слово” развивает навык перевода с вашего родного языка на английский, что позволяет лучше выражать свои мысли на английском языке.",
      img: "./assets/whale.svg",
      block: false,
      active: false
    },
     {
      section: "audio-word",
      title: "Аудирование",
      description: "Тренировка “Аудирование” улучшает восприятие английской речи на слух, а также навыки написания английских слов.",
      img: "./assets/whale.svg",
      block: true,
      active: false
    }]
  };
  constructor(private appService: AppService, private authService: AuthService) {
    this.getAllWords();

    this.authService.getProfile().subscribe(res => this.user = res.user.username);

    this.appService.getAddedCollections().subscribe(_collections => this.addedCollections = _collections.collections);

    this.appService.getOwnCollections().subscribe(_collections => this.ownCollections = _collections.collections);
   }

  ngOnInit() {
  }


    onTabClick(sectionToogle) {
      this.sections.menu.active = false;
      this.sections.trainings.find((section) => section == sectionToogle).active = true;
  }


  onBack() {
    this.sections.trainings.forEach(section => section.active = false);
    this.sections.menu.active = true;
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
