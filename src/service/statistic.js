import { post } from 'util/request';
import APIS from 'api/index';

function requestHomeStatistic() {
  return post(APIS.GET_HOME_DATA);
}
function requestHomeBirth() {
  return post(APIS.GET_HOME_BIRTHDAY);
}
function requestHomeCD() {
  return post(APIS.GET_HOME_CD_STATUS);
}
function requestHomeKC(params) {
  return post(APIS.GET_HOME_KC, params);
}

export {
  requestHomeStatistic,
  requestHomeBirth,
  requestHomeCD,
  requestHomeKC
};
