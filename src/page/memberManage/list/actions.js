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

import { getMemberList, editMember, addMember, delMember, getChareRecord, addRecord } from 'service/category';

const getCategoryListData = (params) => {


  return async dispatch => {
    try {
      const {data} = await getMemberList(params);

      dispatch({
        type: GET_CATEGORY_LIST_DATA,
        payload: {
          memberListData: data.records,
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
    editMember(params).then((msg) => {
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

const saveRecord = (params, cb) => {
  return dispatch => {
    addRecord(params).then(msg => {
      dispatch({
        type: HANDLE_CREATE,
        payload: {
          createModalVisible: false,
          currentEditCategoryData: {}
        }
      });
      cb && cb()
    }).catch(error => message.error(error));
  };
};


const handleCreateCategory = (params, cb) => {
  return dispatch => {
    addMember(params).then(msg => {
      message.success(msg);
      dispatch({
        type: HANDLE_CREATE,
        payload: {
          editorModalVisible: false,
          chargeRecordList: []
        }
      });
      cb && cb()
    }).catch(error => message.error(error));
  };
};

const del = (id, cb) => {
return dispatch => {
    delMember(id).then((msg) => {
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

// const charge = (record) => ({
//   type: HANDLE_EDIT,
//   payload: {
//     createModalVisible: false,
//     currentEditCategoryData: record,
//   }
// });

const charge = (record, cb) => {
return dispatch => {
    dispatch({
      type: HANDLE_EDIT,
      payload: {
        currentEditCategoryData: record,
        createModalVisible: true,
      }
    });
    // getChareRecord(record.id).then((res) => {
    // }).catch(error => message.error(error));
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
  del,
  charge,
  saveRecord
};
