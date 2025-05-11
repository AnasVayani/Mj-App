import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitTrim'
})
export class SplitTrimPipe implements PipeTransform {
  transform(value: string): string[] {
    if (!value) return [];
    return value
      .split(',')
      .map(color => color.trim())
      .filter(color => color !== '');
  }
}
