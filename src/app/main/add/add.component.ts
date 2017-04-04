import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
english: String;
  russian: String;
  example: String;

  @Output() addWord: EventEmitter<any> = new EventEmitter();


  constructor() {
  }

  ngOnInit() {

  }

  onAddWord() {
    const word = {
    english: this.english,
    russian: this.russian,
    example: this.example
   }
    this.addWord.emit(word);

    this.english = '';
    this.russian = '';
    this.example = '';


  //  if(!this.english && !this.russian){}
  // else {
  //     alert('Заполните поля');
  //     return;
  //   }

}

onKeyUp(event) {
  if  (event.key === 'Enter') {
    this.onAddWord();
  }
}

}
