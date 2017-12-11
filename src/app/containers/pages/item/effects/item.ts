import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import {Page} from 'app/models';
import {ItemService} from "../services";

import * as actions from '../actions';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/throttleTime'
import 'rxjs/add/operator/switchMap';





@Injectable()
export class ItemEffects {

  constructor(private actions$: Actions,
              private router: Router,
              private itemService: ItemService) {

  }

  @Effect()
  listItemS$: Observable<Action> = this.actions$
    .ofType(actions.LIST_ITEMS)
    .map((action:actions.ListItemsAction) => action.payload)
    .throttleTime(500)
    .switchMap((page:Page) => {
      return this.itemService.listItems(page)
        .catch(err => {
          throw err;
        })
        .map(res => {
          console.log(res)
          return new actions.ListItemsSuccessAction(res)
        })
    });

  @Effect()
  getItemImages$: Observable<Action> = this.actions$
    .ofType(actions.GET_ITEM_IAMGES)
    .map((action:actions.GetItemImagesAction) => action.payload)
    .throttleTime(500)
    .switchMap(itemId => {
      return this.itemService.selectImages(itemId)
        .catch(err => {
          throw err;
        })
        .map(res => {
          return new actions.GetItemImagesSuccessAction(res);
        })
    });


}
