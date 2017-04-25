import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  @Input() words: any[];
  @Input() addedCollections: any[];
  @Output() deleteWord: EventEmitter<any> = new EventEmitter();

  search: String;
  dontAsk: HTMLElement;
  constructor() { }

  ngOnInit() {
  }

  onDelete(e) {                                                                        //с этой сранью надо будет что-то сделать
  if (this.dontAsk) {
    this.deleteWord.emit(e);
  } else {
    if (document.querySelector('.modal').classList.contains('is-active')) {
      this.deleteWord.emit(e);
    }else {
      document.querySelector('.modal').classList.toggle('is-active');
    }
  }
}

}
