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

import { getJLList, editJL, addJL, delJL } from 'service/category';

const getCategoryListData = (params) => {


  return async dispatch => {
    try {
      const data = await getJLList(params);

      dispatch({
        type: GET_CATEGORY_LIST_DATA,
        payload: {
          dataListData: data.records,
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
    editJL(params).then((msg) => {
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
    editorModalVisible: true,
    currentEditCategoryData: {}
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
    addJL(params).then(msg => {
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
    delJL(id).then((msg) => {
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
