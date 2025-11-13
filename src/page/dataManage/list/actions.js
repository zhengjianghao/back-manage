import { message } from 'antd';

import { 
  GET_CATEGORY_LIST_DATA, 
  OPEN_EDITOR, 
  CANCEL_EDIT, 
  HANDLE_EDIT,
  OPEN_CREATE_MODAL,
  CANCEL_CREATE,
  HANDLE_CREATE,
} from './actionTypes';

import { getDataInfo } from 'service/category';

const getData = (params, cb) => {
  return async dispatch => {
    try {
      const { data } = await getDataInfo(params);
      const chartData = {
        xData: [],
        data: []
      }
      data.coachCompleteCourseStatisticList.map(item => {
        chartData.xData.push(item.name)
        chartData.data.push(item.completeCourseCount)
      })
      dispatch({
        type: GET_CATEGORY_LIST_DATA,
        payload: {
          allData: data,
        }
      });
      cb && cb(chartData)
    } catch (error) {
      message.error(error);
    }
  };
};



export {
  getData
};
