import { GET_STATISTIC, GET_JLLIST } from './actionTypes';

const initialState = {
  statisticData: {},
  jiaoLianList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATISTIC:
      return {
        ...state,
        statisticData: action.statisticData
      };
    case GET_JLLIST:
      return {
        ...state,
        jiaoLianList: action.jiaoLianList
      };
    default:
      return state;
  }
};

export default reducer;
