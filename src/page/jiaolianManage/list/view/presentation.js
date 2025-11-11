import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

import { categoryRoute } from 'util/route';
import EditorModal from './edit-modal';
import CreateModal from './create-modal';
import PageWrapper from 'component/page-wrapper';
import SearchForm from './search-form';

class JiaolianList extends React.Component {
  componentDidMount() {
    document.title = '教练管理';
    this.getList()
  }


  getColumn = () => {

  }

  getList = () => {
    const { getCategoryListData, jiaolianList } = this.props;
    getCategoryListData(jiaolianList.searchParams);
  }

  setMoney = (record) => {
    this.props.showSetMoney(record)
  }


  render() {
    const {
      jiaolianListData, editorModalVisible, currentEditCategoryData, createModalVisible,
      pageSize,
      pageNum,
      cangdiList,
      total,
      editMoneyModal,
      listItemInfo
    } = this.props.jiaolianList;

    const { categoryId } = this.props.match.params;

    const columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '性别',
      dataIndex: 'genderDesc',
      key: 'genderDesc',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '级别',
      dataIndex: 'levelDesc',
      key: 'levelDesc',
    }, {
      title: '专长',
      dataIndex: 'speciality',
      key: 'speciality',
    }, {
      title: '请假时间',
      dataIndex: 'nextLeaveStartTime',
      key: 'nextLeaveStartTime',
      render: (val, record) => {
        <div>
          {record.nextLeaveStartTime}-{record.nextLeaveEndTime}
        </div>
      }
    }, {
      title: '状态',
      dataIndex: 'statusDesc',
      key: 'statusDesc',
    }, {
      title: '操作',
      key: 'action',
      // width: 150,
      render: (text, record) => (
        <span>
          <a onClick={() => this.props.handleOpenEditModal(record)}>编辑</a>
          <a style={{ marginLeft:'12px'}} onClick={() => this.props.del(record.id, this.getList)}>删除</a>
          <Button style={{ marginLeft:'12px'}} type="primary" onClick={this.setMoney.bind(this, record)}>课时提成</Button>
          <Button style={{ marginLeft:'12px'}}>请假</Button>
        </span>
      )
    }];

    const tableProps = {
      columns,
      dataSource: jiaolianListData,
      rowKey: 'id',
      pagination: {
        pageSize,
        current: pageNum,
        total,
        onChange: (page, pageSize) => this.props.getCategoryListData(pageSize, page)
      }
    };

    
    return (
      <PageWrapper>
        <SearchForm
          getProductList={this.props.getCategoryListData}
          pageSize={pageSize}
          pageNum={pageNum}
          cangdiList={cangdiList}
        />
        <div style={{ marginBottom: 30 }}>
          <Button type='primary' onClick={this.props.handleOpenCreateModal}>新增</Button>
        </div>
        <Table {...tableProps} />
        {
          editorModalVisible && 
          <EditorModal
            editorModalVisible={editorModalVisible}
            currentEditCategoryData={currentEditCategoryData}
            handleCancelEdit={this.props.handleCancelEdit}
            handleEditCategoryName={this.props.handleEditCategoryName}
            handleCreateCategory={this.props.handleCreateCategory}
            onEditCallBack={this.getList}
          />
        }
        {
          editMoneyModal &&
          <CreateModal
            visible={editMoneyModal}
            baseDate={listItemInfo}
            handleCancelCreate={this.props.closeSetMoney}
            // onEditCallBack={this.getList}
            handleCreateCategory={this.props.saveConfig}
          />
        }
      </PageWrapper>
    );
  }
}

JiaolianList.propTypes = {
  match: PropTypes.object.isRequired,
  jiaolianList: PropTypes.object.isRequired,
  getCategoryListData: PropTypes.func.isRequired,
  handleOpenEditModal: PropTypes.func.isRequired,
  handleEditCategoryName: PropTypes.func.isRequired,
  handleCancelEdit: PropTypes.func.isRequired,
  handleOpenCreateModal: PropTypes.func.isRequired,
  handleCancelCreate: PropTypes.func.isRequired,
  handleCreateCategory: PropTypes.func.isRequired,
};

export default JiaolianList; 
