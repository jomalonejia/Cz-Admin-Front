import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name:'czImageFrontPipe'})
export class CzImageFrontPipe implements PipeTransform{

  transform(input: string): string {
    return 'http://otlht2gvo.bkt.clouddn.com/front/' + input ;
  }

}
