import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name:'czImageBackendPipe'})
export class CzImageBackendPipe implements PipeTransform{

  transform(input: string): string {
    return 'http://otlht2gvo.bkt.clouddn.com/backend/' + input ;
  }

}
