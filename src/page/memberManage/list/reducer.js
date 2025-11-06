import { 
  GET_CATEGORY_LIST_DATA,
  OPEN_EDITOR,
  CANCEL_EDIT,
  HANDLE_EDIT,
  OPEN_CREATE_MODAL,
  CANCEL_CREATE,
  HANDLE_CREATE,
} from './actionTypes';

const initState = {
  memberListData: [
   {
    "createUserId": 0,
    "createUserName": "",
    "createAt": "",
    "updateUserId": 0,
    "updateUserName": "",
    "updateAt": "",
    "id": 0,
    "name": "",
    "type": 0,
    "typeDesc": "",
    "address": "",
    "capacity": 0,
    "facility": "",
    "status": 0,
    "statusDesc": "",
    "description": "",
    "coverImageList": [],
    "coverImageUrlList": []
  }
  ],
  editorModalVisible: false,
  currentEditCategoryData: {},
  createModalVisible: false,
  cangdiList: [{
    name:'123',
    id:'1'
  }],
  searchParams: {
    size: 10,
    current: 1,
    name: '',
    type: '',
    status: ''
  },
  total: ''
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CATEGORY_LIST_DATA:
    case OPEN_EDITOR:
    case CANCEL_EDIT:
    case HANDLE_EDIT:
    case OPEN_CREATE_MODAL:
    case CANCEL_CREATE:
    case HANDLE_CREATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default reducer;
