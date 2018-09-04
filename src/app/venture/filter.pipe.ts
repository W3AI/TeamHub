import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }

    // resultArray - eg: array of contexts passing the test
    const resultArray = [];
    for (const item of value) {
      
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }

}
