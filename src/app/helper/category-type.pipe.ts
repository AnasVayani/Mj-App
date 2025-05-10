import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryType'
})
export class CategoryTypePipe implements PipeTransform {
  transform(categories: any[], type: string): any[] {
    return categories.filter(c => c.type === type);
  }
}
