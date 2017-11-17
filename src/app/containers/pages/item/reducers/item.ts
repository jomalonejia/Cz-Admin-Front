import * as item from '../actions';

export interface State {
  images: string[];
}

const initialState: State = {
  images: []
};

export function reducer(state: State = initialState, action: item.itemActions): State {
  switch (action.type) {
    case item.GET_ITEM_IAMGES_SUCCESS:
      return Object.assign({},state,{images:action.payload});
    case item.UPLOAD_MAIN_IMAGE:
      const newImages = state.images.map((image,index)=> index == 0 ? Object.assign({},image,{url:action.payload}) : image);
      return Object.assign({},state,{images:[...newImages]});
    default:
      return state;
  }
}

export const getImages = (state: State) => state.images;
