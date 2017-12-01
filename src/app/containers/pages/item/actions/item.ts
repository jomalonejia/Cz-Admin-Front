import {Action} from "@ngrx/store";
import {Page} from 'app/models';
import {ItemContent} from 'app/containers/pages/item/models/itemContent';

export const LIST_ITEMS = '[Item] List Items';
export const LIST_ITEMS_SUCCESS = '[Item] List Items Success';
export const GET_ITEM_IAMGES = '[Item] Get Item Images';
export const GET_ITEM_IAMGES_SUCCESS = '[Item] Get Item Images Success';
export const UPLOAD_MAIN_IMAGE = '[Item] Upload Main Image';
export const UPDATE_ITEM_CONTENT_SUCCESS = '[Item] Update Item Content Success';


export class ListItemsAction implements Action {
  readonly type: string = LIST_ITEMS;
  constructor(public payload: Page) {
  }
}

export class ListItemsSuccessAction implements Action {
  readonly type: string = LIST_ITEMS_SUCCESS;

  constructor(public payload: object) {
  }
}


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


export class UpdateItemContentSuccess implements Action{
  readonly type: string = UPDATE_ITEM_CONTENT_SUCCESS;
  constructor(public payload:ItemContent){

  }
}


export type itemActions = ListItemsAction|ListItemsSuccessAction
                          |UploadMainImageAction |GetItemImagesAction |GetItemImagesSuccessAction
                          |UpdateItemContentSuccess;
