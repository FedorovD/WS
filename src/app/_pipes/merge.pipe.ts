import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'merge',
  pure: false
})
export class MergePipe implements PipeTransform {
  transform(firstArray: any[], secondArray: any[]): any {
    let mergedArray = [];
    firstArray.forEach(elem => {
      mergedArray.push(elem);
    });
    secondArray.forEach(elem => {
      mergedArray.push(elem);
    });
    return mergedArray;
  }
}
