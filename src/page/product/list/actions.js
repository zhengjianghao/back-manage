import { message } from 'antd';

import { 
  requestProductList, 
  requestCoursePage,
  addCourseReq,
  delCourseReq,
  updateCourseReq
} from 'service/product';
import { GET_PRODUCT_LIST_DATA } from './actionTypes';
import { requestCategory } from 'service/category';

/**
 * 
 * @param {string} listType list 表示获取普通列表数据，search 表示获取搜索商品关键字的列表数据
 * @param {number} pageSize 
 * @param {number} pageNum 
 * @param {string} productName 
 */
const getProductList = (params) => {
  return async dispatch => {
    try {
      const { data } = await requestProductList(params);
			
      dispatch({
        type: GET_PRODUCT_LIST_DATA,
        payload: {
          productListData: list,
          searchParmas: {
            ...params,
            size: data.size,
            current: data.current,
          },
          total: data.total
        }
      });
    } catch (error) {
      message.error(error);
    }
  };
};

const getJiaoLianList = (listType, pageSize, pageNum, productName) => {
  return async dispatch => {
    try {
      // const { list, total } = await requestProductList(listType, {
      //   pageSize,
      //   pageNum,
      //   productName
      // });
			
      dispatch({
        type: GET_PRODUCT_LIST_DATA,
        payload: {
          jiaoLianList: [{
            name: '1',
            id: 3
          }, {
            name: '12',
            id: 33
          }]
        }
      });
    } catch (error) {
      message.error(error || '查询商品列表出错');
    }
  };
};

const getCourtList = () => {


  return async dispatch => {
    try {
      const {data} = await requestCategory({
        size: 100,
        current: 1
      });

      dispatch({
        type: GET_PRODUCT_LIST_DATA,
        payload: {
          courList: data.records,
        }
      });
    } catch (error) {
      message.error(error);
    }
  };
};

const getCourseTypeList = (params) => {
  return async dispatch => {
    try {
      const {data} = await requestCoursePage(params);

      dispatch({
        type: GET_PRODUCT_LIST_DATA,
        payload: {
          courseTypeList: data.records,
        }
      });
    } catch (error) {
      message.error(error);
    }
  };
};

const addCourse = (params, cb) => {
  return async dispatch => {
    try {
      const {data} = await addCourseReq(params);
      cb && cb()
    } catch (error) {
      message.error(error);
    }
  };
};

const delCourse = (params, cb) => {
  return async dispatch => {
    try {
      const {data} = await delCourseReq(params);
      cb && cb()
    } catch (error) {
      message.error(error);
    }
  };
};


const updateCourse = (params, cb) => {
  return async dispatch => {
    try {
      const {data} = await updateCourseReq(params);
      dispatch({
        type: GET_PRODUCT_LIST_DATA,
        payload: {
          editorModalVisible: false,
          currentEditCategoryData: {}
        }
      });
      cb && cb()
    } catch (error) {
      message.error(error);
    }
  };
};

const handleOpenCreateModal = () => ({
  type: GET_PRODUCT_LIST_DATA,
  payload: {
    editorModalVisible: true,
    currentEditCategoryData: {}
  }
});

const handleOpenEditModal = (record) => ({
  type: GET_PRODUCT_LIST_DATA,
  payload: {
    editorModalVisible: true,
    currentEditCategoryData: record
  }
});

const handleCancelEdit = () => ({
  type: GET_PRODUCT_LIST_DATA,
  payload: {
    editorModalVisible: false,
    currentEditCategoryData: {}
  }
});




export {
  getProductList,
  getJiaoLianList,
  getCourtList,
  getCourseTypeList,
  addCourse,
  delCourse,
  updateCourse,
  handleOpenCreateModal,
  handleOpenEditModal,
  handleCancelEdit
};
