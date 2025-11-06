import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

import { categoryRoute } from 'util/route';
import EditorModal from './edit-modal';
import CreateModal from './create-modal';
import PageWrapper from 'component/page-wrapper';
import SearchForm from './search-form';

class MemberList extends React.Component {
  componentDidMount() {
    document.title = '会员管理';
    this.getList()
  }

  componentDidUpdate(prevProps) {
    const { categoryId } = this.props.match.params;
    const { categoryId: prevCategoryId } = prevProps.match.params;

    if (categoryId !== prevCategoryId) {
      this.props.getCategoryListData(categoryId);
    }
  }

  getColumn = () => {

  }

  getList = () => {
    const { getCategoryListData, searchParams } = this.props;
    

    getCategoryListData(searchParams);
  }



  render() {
    const {
      memberListData, editorModalVisible, currentEditCategoryData, createModalVisible,
      pageSize,
      pageNum,
      cangdiList,
      total
    } = this.props.memberList;

    const { categoryId } = this.props.match.params;

    const columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
    }, {
      title: '专长',
      dataIndex: 'speciality',
      key: 'speciality',
    }, {
      title: '请假时间',
      dataIndex: 'date',
      key: 'date',
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
      width: 150,
      render: (text, record) => (
        <span>
          <a onClick={() => this.props.handleOpenEditModal(record)}>编辑</a>
          <a style={{ marginLeft:'12px'}} onClick={() => this.props.del(record.id, this.getList)}>删除</a>
        </span>
      )
    }];

    const tableProps = {
      columns,
      dataSource: memberListData,
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
        <EditorModal
          editorModalVisible={editorModalVisible}
          currentEditCategoryData={currentEditCategoryData}
          handleCancelEdit={this.props.handleCancelEdit}
          handleEditCategoryName={this.props.handleEditCategoryName}
          onEditCallBack={this.getList}
        />
        <CreateModal
          parentId={categoryId}
          visible={createModalVisible}
          handleCancelCreate={this.props.handleCancelCreate}
          onEditCallBack={this.getList}
          handleCreateCategory={this.props.handleCreateCategory}
        />
      </PageWrapper>
    );
  }
}

MemberList.propTypes = {
  match: PropTypes.object.isRequired,
  memberList: PropTypes.object.isRequired,
  getCategoryListData: PropTypes.func.isRequired,
  handleOpenEditModal: PropTypes.func.isRequired,
  handleEditCategoryName: PropTypes.func.isRequired,
  handleCancelEdit: PropTypes.func.isRequired,
  handleOpenCreateModal: PropTypes.func.isRequired,
  handleCancelCreate: PropTypes.func.isRequired,
  handleCreateCategory: PropTypes.func.isRequired,
};

export default MemberList; 
