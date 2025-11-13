import { message } from 'antd';

import { GET_STATISTIC, GET_JLLIST } from './actionTypes.js';
import { requestHomeStatistic, requestHomeBirth, requestHomeCD, requestHomeKC } from 'service/statistic.js';
import moment from 'moment'



const hideBirthModal = () => ({
  type: GET_STATISTIC,
  payload: {
    showBirthModal: false
  }
});

const showBirth = () => ({
  type: GET_STATISTIC,
  payload: {
    showBirthModal: true
  }
});

function getStatisticData() {
  return async dispatch => {
    try {
      const { data } = await requestHomeStatistic();
      const isWeekOne =  moment().format('d') === '1'
      debugger
      dispatch({
        type: GET_STATISTIC,
        payload: {
          homeData: data,
          showBirthModal: isWeekOne,
          birthList: data.studentBirthdayInThisWeekList
        }
      });
    } catch (error) {
      message.error(error);
    }
  };
}

function getBirthDay() {
  return async dispatch => {
    try {
      const { data } = await requestHomeBirth();
      dispatch({
        type: GET_STATISTIC,
        payload: {
          birthData: data
        }
      });
    } catch (error) {
      message.error(error);
    }
  };
}

function getCdStatus(params) {
  return async dispatch => {
    try {
      const { data = [] } = await requestHomeCD(params);
      dispatch({
        type: GET_STATISTIC,
        payload: {
          cdList: data
        }
      });
    } catch (error) {
      message.error(error);
    }
  };
}

function getKCList(params) {
  return async dispatch => {
    try {
      const { data } = await requestHomeKC(params);
      dispatch({
        type: GET_STATISTIC,
        payload: {
          kcList: data || []
        }
      });
    } catch (error) {
      message.error(error);
    }
  };
}

export {
  getStatisticData,
  getKCList,
  getCdStatus,
  getBirthDay,
  hideBirthModal,
  showBirth
};
