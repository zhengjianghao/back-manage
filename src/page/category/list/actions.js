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

import { requestCategory, requestEditCategoryName, requestCreateCategory, delCD } from 'service/category';

const getCategoryListData = (params) => {


  return async dispatch => {
    try {
      const data = await requestCategory(params);

      dispatch({
        type: GET_CATEGORY_LIST_DATA,
        payload: {
          categoryListData: data.records,
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

const handleOpenEditModal = (record) => ({
  type: OPEN_EDITOR,
  payload: {
    editorModalVisible: true,
    currentEditCategoryData: record
  }
});

const handleCancelEdit = () => ({
  type: CANCEL_EDIT,
  payload: {
    editorModalVisible: false,
    currentEditCategoryData: {}
  }
});

const handleEditCategoryName = (params, cb) => {
  return dispatch => {
    requestEditCategoryName(params).then((msg) => {
      message.success(msg);
      dispatch({
        type: HANDLE_EDIT,
        payload: {
          editorModalVisible: false,
          currentEditCategoryData: {}
        }
      });
      cb && cb()
    }).catch(error => message.error(error));
  };
};

const handleOpenCreateModal = () => ({
  type: OPEN_CREATE_MODAL,
  payload: {
    createModalVisible: true,
  }
});

const handleCancelCreate = () => ({
  type: CANCEL_CREATE,
  payload: {
    createModalVisible: false
  }
});

const handleCreateCategory = (params, cb) => {
  return dispatch => {
    requestCreateCategory(params).then(msg => {
      message.success(msg);
      dispatch({
        type: HANDLE_CREATE,
        payload: {
          createModalVisible: false
        }
      });
      cb && cb()
    }).catch(error => message.error(error));
  };
};

const del = (id, cb) => {
return dispatch => {
    delCD(id).then((msg) => {
      message.success(msg);
      // dispatch({
      //   type: HANDLE_EDIT,
      //   payload: {
      //     editorModalVisible: false,
      //     currentEditCategoryData: {}
      //   }
      // });
      cb && cb()
    }).catch(error => message.error(error));
  };
}

export {
  getCategoryListData,
  handleEditCategoryName,
  handleOpenEditModal,
  handleCancelEdit,
  handleOpenCreateModal,
  handleCancelCreate,
  handleCreateCategory,
  del
};
