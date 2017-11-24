import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name:'orderStatus'})
export class OrderStatusPipe implements PipeTransform {

    transform(query: string): any {
        return query.toLocaleLowerCase().replace(/_/,' ')
    }
}
