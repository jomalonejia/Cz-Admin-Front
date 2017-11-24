import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'itemParamPipe'
})
export class ItemParamPipe implements PipeTransform{
  transform(value: any, args: any[] = null): any {
    return Object.keys(value);
  }
}
