import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideCollection'
})
export class HideCollectionPipe implements PipeTransform {

  transform(value: any, search: String = '', active?: boolean): boolean {
    if (!active) return false;
    let searchQuery = search;
    let displayedWords = value.filter((el)=>{
    let searchValueEng = el.english;
    let searchValueRus = el.russian;
      return searchValueEng.indexOf(searchQuery) != -1 || searchValueRus.indexOf(searchQuery) != -1;
});
return displayedWords.length > 0 ?  false : true;
  }

}
