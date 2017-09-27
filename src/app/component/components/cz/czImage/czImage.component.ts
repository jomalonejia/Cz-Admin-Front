import {Component, Input, Renderer2} from "@angular/core";
import {FileItem, FileUploader, ParsedResponseHeaders} from "ng2-file-upload";
import * as constants from '../../../constants';

@Component({
  selector:'cz-image',
  styleUrls:['./czImage.scss'],
  templateUrl:'./czImage.html'
})

export class CzImage{

  @Input() image:string;
  @Input() size:string;

  defaultPicture = 'default.png';

  uploader:FileUploader;

  constructor(private renderer:Renderer2){

    //const token = JSON.parse(localStorage.getItem('login'))['token'];
    const token = '';

    this.uploader = new FileUploader({
      url: constants.ITEM_MINUS_IMAGE_URL,
      method: "POST",
      itemAlias: "itemImageUpload",
      authTokenHeader:constants.TOKEN_HEADER,
      authToken:token,
      autoUpload:true
    });
  }

  ngOnInit(){
    this.uploader.onSuccessItem = (item:FileItem, response:string, status:number, headers:ParsedResponseHeaders) => {
      if (status == 200) {
        console.log(response);
      }else {
        console.log('error');
      }
    }

  }

  bringFileSelector():boolean {
    this.renderer.selectRootElement('#fileUpload').click();
    return false;
  }

  removePicture(){
    console.log('aa');
  }


}
