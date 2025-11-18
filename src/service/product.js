import { get, post, postForm } from 'util/request';
import APIS from 'api/index';

/**
 * 获取商品列表数据
 * @param {string} listType 列表类型，list 代表普通列表，search 表示搜索列表
 * @param {object} params 查询参数
 */
function requestProductList(params) {
  
  return post(APIS.GET_CLASS_LIST, params);
}

/**
 * 变更商品上下架状态
 * @param {string} productId 商品 id
 * @param {string} status 状态
 */
function requestSetProductSaleStatus(productId, status) {
  const url = '/manage/product/set_sale_status.do';
  return post(url, {
    productId,
    status
  });
}

/**
 * 获取商品详情
 * @param {string} productId 
 */
function requestProductDetail(productId) {
  const url = '/manage/product/detail.do';
  return get(url, {
    productId
  });
}

/**
 * 新增商品
 * @param {object} data 表单数据
 */
function requestSaveProduct(data) {
  return post(APIS.GET_COURSE_PAGE, data);
}

function requestCoursePage(params) {
  return post(APIS.GET_COURSE_PAGE, params);
}

function addCourseReq(params) {
  return post(APIS.ADD_COURSE, params);
}

function delCourseReq(params) {
  return post(APIS.DEL_COURSE + '/' +  params.id);
}
function updateCourseReq(params) {
  return post(APIS.UPDATE_COURSE, params);
}
function getAllKc(params) {
  return post(APIS.GET_ALL_CK, params);
}

export {
  requestProductList,
  requestSetProductSaleStatus,
  requestProductDetail,
  requestSaveProduct,
  requestCoursePage,
  addCourseReq,
  delCourseReq,
  updateCourseReq,
  getAllKc
};
