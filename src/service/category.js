import { get, post } from 'util/request';
import APIS from 'api/index';

// 获取场地列表
function requestCategory(params) {

  return get(APIS.GET_CD_LIST, params);
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

  return get(APIS.GET_COACH_LIST, params);
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

  return get(APIS.GET_MEMBER_LIST, params);
}


function addMember(params) {
  return post(APIS.ADD_COACH, params);
}
function editMember({id, ...other}) {
  const url = `/admin/member/${id}/update`;
  return post(url, {
    ...other
  });
}

function delMember(id) {
  const url = `/admin/member/${id}/delete`;
  return post(url);
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
  delMember
};
