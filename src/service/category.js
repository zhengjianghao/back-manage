import { get, post } from 'util/request';
import APIS from 'api/index';

// 获取场地列表
function requestCategory(params) {

  return post(APIS.GET_CD_LIST, params);
}

/**
 * 更新品类名称
 * @param {string} categoryId 
 * @param {string} categoryName 
 */
function requestCreateCategory(params) {
  return post(APIS.ADD_CD, params);
}
function requestEditCategoryName({id, ...other}) {
  const url = `/admin/court/${id}/update`;
  return post(url, {
    ...other
  });
}

function delCD(id) {
  const url = `/admin/court/${id}/delete`;
  return post(url);
}


// 教练相关
function getJLList(params) {

  return post(APIS.GET_COACH_LIST, params);
}


function getJLMoneyConfig(id) {

  return post(APIS.GET_COACH_MONEY_CONFIG + id);
}


function saveJLMoneyConfig(params) {

  return post(APIS.SAVE_COACH_MONEY_CONFIG, params);
}


function addJL(params) {
  return post(APIS.ADD_COACH, params);
}
function editJL({id, ...other}) {
  const url = `/admin/coach/${id}/update`;
  return post(url, {
    ...other
  });
}

function delJL(id) {
  const url = `/admin/coach/${id}/delete`;
  return post(url);
}

// 会员相关
function getMemberList(params) {

  return post(APIS.GET_MEMBER_LIST, params);
}


function addMember(params) {
  return post(APIS.ADD_MEMBER, params);
}
function editMember({id, ...other}) {
  const url = `/admin/student/${id}/update`;
  return post(url, {
    ...other
  });
}

function delMember(id) {
  const url = `/admin/student/${id}/delete`;
  return post(url);
}

function getChareRecord(id) {
  return post(APIS.GET_RECORD_LIST, {
    studentId: id,
    current: 1,
    size: 30
  });
}

function addRecord(params) {
  return post(APIS.ADD_RECORD, params);
}

function editRecord({id, ...other}) {
  const url = `/admin/student/charge/${id}/update`;
  return post(url, {
    ...other
  });
}

function getLeave(params) {
  const url = `/admin/coach/leave/page`;
  return post(url, {
    ...params
  });
}

function addLeave(params) {
  const url = `/admin/coach/leave/add`;
  return post(url, {
    ...params
  });
}

function getDataInfo(params) {
  const url = `/admin/statistics`;
  return post(url, {
    ...params
  });
}




export {
  requestCategory,
  requestEditCategoryName,
  requestCreateCategory,
  delCD,
  getJLList,
  addJL,
  editJL,
  delJL,
  getMemberList,
  addMember,
  editMember,
  delMember,
  getJLMoneyConfig,
  saveJLMoneyConfig,
  getChareRecord,
  addRecord,
  editRecord,
  getLeave,
  addLeave,
  getDataInfo
};
