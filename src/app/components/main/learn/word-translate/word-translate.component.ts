import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-word-translate',
  templateUrl: './word-translate.component.html',
  styleUrls: ['./word-translate.component.css']
})
export class WordTranslateComponent implements OnInit {
  @Input() collections: any[];

  currentSession = [
    {
      active: true,
      show: true,
      name: 'Выбор коллекции на изучение'
    },
    {
      active: false,
      show: false,
      name: 'lorem'
    }
  ];

  collectionForStudying: any;

  firstStepCurrent: Object;

  constructor() {
  }

  ngOnInit() {

  }

  begin(collection: Object) {
    this.collectionForStudying = collection;
    console.log(this.collectionForStudying);
    this.currentSession[0].active = false;
    this.currentSession[1].show = true;
    setTimeout(() => { this.currentSession[1].active = true; }, 400);
    setTimeout(() => { this.currentSession[0].show = false; }, 500);
    this.composeFirstStepPlan();
  }

  composeFirstStepPlan() {
    const firstStepMap = this.randomShuffle(this.collectionForStudying.words);
    this.firstStepCurrent = firstStepMap[0];
    console.log(this.randomShuffle(this.collectionForStudying.words));
  }


  randomShuffle(source: Array<any>): any {
    let map = [];
    let returnValue = [];
    while (map.length != source.length) {
      const rnd = Math.floor(Math.random() * (source.length - 1 - 0)) + 0;
      if (map.indexOf(rnd)) {
        returnValue.push({ word: source[rnd].english, knew: null });
        map.push(rnd);
      }
    };
    return returnValue;
  }


}
