export const URL_PREFIX = '/api';

export const USER_PREFIX = URL_PREFIX + '/user';
export const LOGIN_URL = USER_PREFIX + '/login';
export const LOGOUT_URL = USER_PREFIX + '/logout';
export const REGISTER_URL = USER_PREFIX + '/register';
export const GETSETTINGS_URL = USER_PREFIX + '/getSettings';
export const SETSETTINGS_URL = USER_PREFIX + '/setSettings';
export const GETUSERLIST_URL = USER_PREFIX + '/listUserWithRole';
export const UPDATEUSER_URL = USER_PREFIX + '/updateUser';
export const DELETEUSER_URL = USER_PREFIX + '/deleteUser';
export const LIST_RELATED_USERS_URL = USER_PREFIX + '/listRelatedUsers';
export const REFRESH_TOKEN_URL = USER_PREFIX + '/refresh';


export const ITEM_PREFIX = URL_PREFIX + '/item';
export const ITEM_LIST_URL = ITEM_PREFIX + '/list';
export const ITEM_ADD_URL = ITEM_PREFIX + '/add';
export const ITEM_DELETE_URL = ITEM_PREFIX + '/delete';
export const ITEM_UPDATE_URL = ITEM_PREFIX + '/update';
export const ITEM_UPDATE_IMAGE_URL = ITEM_UPDATE_URL + '';
export const ITEM_IMAGES_UPDATE_URL = ITEM_PREFIX + '/images/update';
export const ITEM_IMAGES_SELECT_URL = ITEM_PREFIX +'/images/select';
export const ITEM_ADD_CONTENT_URL = ITEM_PREFIX +'/content/add';


export const CATEGORY_PREFIX = URL_PREFIX + '/category';
export const CATEGORY_ADD = CATEGORY_PREFIX + '/add';
export const CATEGORY_EDIT = CATEGORY_PREFIX + '/edit';
export const CATEGORY_DELETE = CATEGORY_PREFIX + '/delete';
export const CATEGORY_LIST_TREE_CATEGORIES = CATEGORY_PREFIX + '/listTreeCategories';
export const CATEGORY_LIST_PARENT_CATEGORIES = CATEGORY_PREFIX + '/listParentCategories';
export const CATEGORY_LIST_CHILD_CATEGORIES = CATEGORY_PREFIX + '/listChildCategories';

export const PARAM_PREFIX = URL_PREFIX + '/param';
export const PARAM_LIST_URL = PARAM_PREFIX + '/list';

export const ORDER_PREFIX = URL_PREFIX + '/order';
export const ORDER_LIST_URL = ORDER_PREFIX + '/list';


