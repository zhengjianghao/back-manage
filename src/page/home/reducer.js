import { GET_STATISTIC, GET_JLLIST } from './actionTypes';

const initialState = {
  homeData: {},
  birthData: {},
  cdList: [],
  kcList: [],
  showBirthModal: false,
  birthList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATISTIC:
      return {
        ...state,
        ...action.payload
      };
    case GET_JLLIST:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default reducer;
