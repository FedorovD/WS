import {Component,OnInit,Input} from '@angular/core';

@Component({
  selector: 'app-word-translate',
  templateUrl: './word-translate.component.html',
  styleUrls: ['./word-translate.component.css']
})
export class WordTranslateComponent implements OnInit {
  @Input() addedCollections: any[];
  @Input() ownCollections: any[];

  @Input() collections: any[];
  currentSession = [
    {
      active: true,
      name: 'Выбор коллекции на изучение'
    },
    {

    }
  ];
  constructor() {}

  ngOnInit() {
  }

}
