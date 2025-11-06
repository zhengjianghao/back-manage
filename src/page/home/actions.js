import { message } from 'antd';

import { GET_STATISTIC, GET_JLLIST } from './actionTypes.js';
import { requestHomeStatistic } from 'service/statistic.js';

const saveData = data => ({
  type: GET_STATISTIC,
  statisticData: data
});

const saveJiaoLian = data => ({
  type: GET_JLLIST,
  ...data
});


function getStatisticData() {
  return async dispatch => {
    try {
      // const { orderCount, productCount, userCount } = await requestHomeStatistic();

      dispatch(saveData({
        orderCount: 1, 
        productCount: 3, 
        userCount: 3
      }));
    } catch (error) {
      message.error(error);
    }
  };
}

function getJiaoLianList() {
  return async dispatch => {
    try {
      // const { orderCount, productCount, userCount } = await requestHomeStatistic();
      dispatch(saveJiaoLian({
        jiaoLianList: [{name: '123', id: 1}, {name: 'svzvb', id: 2}, {name: 'asdgas', id: 3}], 
      }));
    } catch (error) {
      message.error(error);
    }
  };
}

export {
  saveData,
  getStatisticData,
  getJiaoLianList
};
