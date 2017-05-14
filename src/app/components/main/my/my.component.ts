import {AppService} from '../../../_services/app.service';
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit {
  @Input() words: any[];
  @Input() addedCollections: any[];
  @Input() ownCollections: any[];
  @Input() collections: any[];
  @Output() deleteWord: EventEmitter < any > = new EventEmitter();

  search: String;
  dontAsk: HTMLElement;
  globalCollections: any[];
  displaying = [{
      name: 'card',
      icon: 'fa-clone',
      disable: true,
      abbr: 'Отобразить карточками'
    },
    {
      name: 'list',
      icon: 'fa-list',
      disable: false,
      abbr: 'Отобразить таблицей'
    }
  ];

  addCollectionModalTab = [{
      title: 'Создать',
      active: true
    },
    {
      title: 'Добавить',
      active: false
    }
  ];
  constructor(private appService: AppService) {}

  ngOnInit() {
  }

  onDelete(e) {                                             //с этой сранью надо будет что-то сделать
    if (this.dontAsk) {
      this.deleteWord.emit(e);
    } else {
      if (document.querySelector('.modal').classList.contains('is-active')) {
        this.deleteWord.emit(e);
      } else {
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
    if (this.collections.indexOf(collection) > -1) {
          this.appService.deleteCollection(collection._id).subscribe(res => {
      if (!res.success) {
        return this.appService.showFlashMessage(`${res.msg}`, 'notification is-info animated bounceInDown', 2000);
      } else {
        this.collections.forEach(_collection => {
          if (_collection._id == res.collection) {
            this.collections.splice(this.collections.indexOf(_collection), 1);
            this.appService.showFlashMessage(`${collection.name} collection successfully deleted.`, 'notification is-success animated bounceInDown', 2000);
          }
        });
      }
    });
    } else {
      this.appService.showFlashMessage(`error`, 'notification is-warning animated bounceInDown', 2000);
    }
  }

  onAddNewCollectionModal() {
    this.appService.getGlobalCollections().subscribe(collections => {
      this.globalCollections = collections;
      this.globalCollections.forEach(collection => {
        this.collections.forEach(_collection => {
          if (_collection._id == collection._id) collection.added = true;
        });
      });
    });
  }

  onCreateNewCollection(name: string, description: string) {
    const collection = {
      name: name,
      description: description
    };
    this.appService.createOwnCollection(collection).subscribe(res => {
      if (!res.success) {
        return this.appService.showFlashMessage(`${res.msg}`, 'notification is-info animated bounceInDown', 2000);
      } else {
        this.collections.unshift(res.collection);
         this.appService.showFlashMessage(`${collection.name} collection successfully created.`, 'notification is-success animated bounceInDown', 2000);
      }
    });
  }

  onAddCollection(collection) {
    if (collection.added) {
      this.appService.showFlashMessage(`${collection.name} collection added already.`, 'notification is-info animated bounceInDown', 2000);
    } else {
      this.appService.subscribeToCollection(collection._id).subscribe(res => {
        if (!res.success) {
          this.appService.showFlashMessage(`${res.msg}`, 'notification is-info animated bounceInDown', 2000);
        } else {
          this.globalCollections.forEach(_collection => {
            if (_collection._id == collection._id) {
              this.globalCollections[this.globalCollections.indexOf(_collection)].added = true;
              this.collections.push(res.collection);
              this.appService.showFlashMessage(`${collection.name} collection successfully added.`, 'notification is-success animated bounceInDown', 2000);
            }
          });
        }
      });
    }
  }

  onHide(collection) {
    if (collection.hidden === undefined) collection.hidden = false;
    this.collections.indexOf(collection) > -1 ?
      this.collections.forEach(_collection => {
        if (_collection._id == collection._id) {
          _collection.hidden ? _collection.hidden = false : _collection.hidden = true;
        }
      }) :
      this.ownCollections.forEach(_collection => {
        if (_collection._id == collection._id) {
          _collection.hidden ? _collection.hidden = false : _collection.hidden = true;
        }
      });

  }

  onAddCollectionTab(tab) {
    this.addCollectionModalTab.find((item) => item.active == true).active = false;
    this.addCollectionModalTab.find((item) => item == tab).active = true;
  }
}
