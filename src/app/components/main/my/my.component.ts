import { AppService } from '../../../_services/app.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit {
  @Input() words: any[];
  @Input() addedCollections: any[];
  @Output() deleteWord: EventEmitter<any> = new EventEmitter();

  search: String;
  dontAsk: HTMLElement;
  allCollections: any[];
  displaying = [
    {  name: 'card',
      icon: 'fa-clone',
      disable: true},
    {name: 'list',
      icon: 'fa-list',
      disable: false}
  ];

   addCollectionModalTab = [
    {  title: 'Создать',
      active: true},
      {  title: 'Добавить',
      active: false}
  ];
  constructor(private appService: AppService) { }

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

   onToggleDisplay(toogleItem) {
     this.displaying.find((item) => item.disable == true).disable = false;
      this.displaying.find((item) => item == toogleItem).disable = true;
  }

  onAddWordInCollection(collection) {
  console.log(collection);
  }

   onDeleteCollection(collection) {
    console.log(collection);
  }

  onAddNewCollectionModal() {
     this.appService.getAllCollections().subscribe(collections => {
       this.allCollections = collections;
       this.allCollections.forEach(collection => {
          this.addedCollections.forEach(_collection => {
            if(_collection._id == collection._id) collection.added = true;
          });
       });
     });
  }

    onAddNewCollection(name: string, description: string) {
   let collection = {
     name: name,
     description: description
   };
   this.appService.createOwnCollection(collection).subscribe(res => console.log(res));
  }

  onAddCollectionTab(tab) {
     this.addCollectionModalTab.find((item) => item.active == true).active = false;
     this.addCollectionModalTab.find((item) => item == tab).active = true;
  }
}
