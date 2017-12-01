import * as item from '../actions';

export interface State {
  itemsInfo: any,
  images: any;
}

const initialState: State = {
  itemsInfo: {},
  images: [],
};

export function reducer(state: State = initialState, action: item.itemActions): State {
  switch (action.type) {
    case item.LIST_ITEMS_SUCCESS:
      return {
        ...state,
        itemsInfo: action.payload
      };
    case item.GET_ITEM_IAMGES_SUCCESS:
      return {
        ...state,
        images: action.payload
      };
    case item.UPLOAD_MAIN_IMAGE:
      const newImages = state.images.map((image, index) => index == 0 ? Object.assign({}, image, {url: action.payload}) : image);
      return {
        ...state,
        images: [...newImages]
      };
    case item.UPDATE_ITEM_CONTENT_SUCCESS:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
}

export const getImages = (state: State) => state.images;
export const getItemsInfo = (state: State) => state.itemsInfo;
