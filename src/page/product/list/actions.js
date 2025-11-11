import { message } from 'antd';

import { 
  requestProductList, 
  requestSetProductSaleStatus, 
} from 'service/product';
import { GET_PRODUCT_LIST_DATA } from './actionTypes';

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



export {
  getProductList,
  getJiaoLianList,
};
