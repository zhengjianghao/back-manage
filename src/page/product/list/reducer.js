import { GET_PRODUCT_LIST_DATA } from './actionTypes';

const initState = {
  productListData: [],
  pageSize: 0,
  pageNum: 0,
  listType: 'list',
  productName: '',
  jiaoLianList: [{
    name: '1',
    id: 3
  }, {
    name: '12',
    id: 33
  }],
  searchParams: {
    size: 10,
    current: 1,
    studentName: '',
    coachName: '',
    type: '',
    status: ''
  }
};

const reducer = (state = initState, action) => {
  
  switch (action.type) {
    case GET_PRODUCT_LIST_DATA:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default reducer;
