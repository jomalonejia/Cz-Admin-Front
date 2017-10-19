import {Component, EventEmitter, Input, Output, Renderer2} from '@angular/core';
import {FileItem, FileUploader, ParsedResponseHeaders} from "ng2-file-upload";
import * as constants from 'app/constants';

@Component({
  selector:'cz-image',
  styleUrls:['./czImage.scss'],
  templateUrl:'./czImage.html'
})

export class CzImage{

  @Input() image:string;
  @Input() size:string;
  @Input() uploadUrl:string;
  @Input() uploadParam:string;
  @Input() specificId:string;
  id:string = 'fileUpload-';

  defaultPicture = constants.DEFAULT_IMAGE_URL;

  uploader:FileUploader;

  constructor(private renderer:Renderer2){

  }



  ngOnInit(){

    this.id += this.specificId;

    const token = JSON.parse(localStorage.getItem('auth'))['token'];
    this.uploader = new FileUploader({
      /* url: constants.ITEM_IMAGES_UPDATE_URL,*/
      url:this.uploadUrl+this.uploadParam,
      method: "POST",
      itemAlias: "imageUpload",
      authTokenHeader:constants.TOKEN_HEADER,
      authToken:token,
      autoUpload:true
    });
    this.uploader.onSuccessItem = (item:FileItem, response:string, status:number, headers:ParsedResponseHeaders) => {
      if (status == 200) {
        this.image = response;
      }else {
        console.log('error');
      }
    }

  }

  bringFileSelector():boolean {
    this.renderer.selectRootElement('#' + this.id).click();
    return false;
  }

  selectedFileOnChanged(event){

  }

  removePicture(){
    console.log('remove');
  }


}
