import {Action} from "@ngrx/store";

export const GET_ITEM_IAMGES = '[Item] Get Item Images';
export const GET_ITEM_IAMGES_SUCCESS = '[Item] Get Item Images Success';
export const UPLOAD_MAIN_IMAGE = '[Item] Upload Main Image';

export class GetItemImagesAction implements Action {
  readonly type: string = GET_ITEM_IAMGES;

  constructor(public payload: string) {
  }
}

export class GetItemImagesSuccessAction implements Action {
  readonly type: string = GET_ITEM_IAMGES_SUCCESS;

  constructor(public payload: string[]) {
  }
}

export class UploadMainImageAction implements Action {
  readonly type: string = UPLOAD_MAIN_IMAGE;

  constructor(public payload: string) {
  }
}


export type itemActions = UploadMainImageAction
                          |GetItemImagesAction
                          |GetItemImagesSuccessAction;
