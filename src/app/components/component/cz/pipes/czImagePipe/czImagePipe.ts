import {Pipe, PipeTransform} from "@angular/core";
import * as constants from 'app/constants/image.constants';

@Pipe({name:'czImagePipe'})
export class CzImagePipe implements PipeTransform{

  transform(input: string): string {
    if(input == null || input == ''){
      return constants.DEFAULT_IMAGE_URL;
    }
    return input ;
  }
}
