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

import { getJLList, editJL, addJL, delJL, getJLMoneyConfig, saveJLMoneyConfig, getLeave, addLeave } from 'service/category';

const getCategoryListData = (params) => {


  return async dispatch => {
    try {
      const {data} = await getJLList(params);

      dispatch({
        type: GET_CATEGORY_LIST_DATA,
        payload: {
          jiaolianListData: data.records,
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

const showSetMoney = (val) => {
  return async dispatch => {
    try {
      const { data } = await getJLMoneyConfig(val.id);

      dispatch({
        type: GET_CATEGORY_LIST_DATA,
        payload: {
          editMoneyModal: true,
          listItemInfo: {
            ...val,
            configList: data.configList
            // configList: [1,2,3]
          }
        }
      });
    } catch (error) {
      message.error(error);
    }
  };
};

const saveConfig = (params) => {
  return async dispatch => {
    try {
      const data = await saveJLMoneyConfig(params);

      dispatch({
        type: GET_CATEGORY_LIST_DATA,
        payload: {
          editMoneyModal: false,
          listItemInfo: {}
        }
      });
    } catch (error) {
      message.error(error);
    }
  };
};

const closeSetMoney = () => ({
  type: CANCEL_EDIT,
  payload: {
    editMoneyModal: false,
    listItemInfo: {}
  }
});

// 编辑教练
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
// 新增教练
const handleCreateCategory = (params, cb) => {
  return dispatch => {
    addJL(params).then(msg => {
      message.success(msg);
      dispatch({
        type: HANDLE_CREATE,
        payload: {
          editorModalVisible: false,
          currentEditCategoryData: {}
        }
      });
      cb && cb()
    }).catch(error => message.error(error));
  };
};


//
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

const getLeaveList = (params) => {


  return async dispatch => {
    try {
      const {data} = await getLeave(params);

      dispatch({
        type: GET_CATEGORY_LIST_DATA,
        payload: {
          leaveList: data.records,
        }
      });
    } catch (error) {
      message.error(error);
    }
  };
};

const handleShowLeaveModal = (record) => ({
  type: OPEN_EDITOR,
  payload: {
    showLeaveModal: true,
    currentEditCategoryData: record
  }
});

const closeLeaveModal = () => ({
  type: CANCEL_CREATE,
  payload: {
    showLeaveModal: false
  }
});

const saveLeave = (params, cb) => {
  return dispatch => {
    addLeave(params).then(msg => {
      message.success(msg);
      dispatch({
        type: HANDLE_CREATE,
        payload: {
          showLeaveModal: false,
          currentEditCategoryData: {}
        }
      });
      cb && cb()
    }).catch(error => message.error(error));
  };
};


export {
  getCategoryListData,
  handleEditCategoryName,
  handleOpenEditModal,
  handleCancelEdit,
  handleOpenCreateModal,
  handleCancelCreate,
  handleCreateCategory,
  del,
  showSetMoney,
  closeSetMoney,
  saveConfig,
  closeLeaveModal,
  saveLeave,
  getLeaveList,
  handleShowLeaveModal
};
