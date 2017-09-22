import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name:'czProfilePipe'})
export class CzProfilePipe implements PipeTransform{

  transform(input: string): string {
    return 'http://otlht2gvo.bkt.clouddn.com/' + input ;
  }

}
