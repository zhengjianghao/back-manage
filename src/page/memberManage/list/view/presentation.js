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

  getColumn = () => {

  }

  getList = () => {
    const { getCategoryListData, memberList } = this.props;
    getCategoryListData(memberList.searchParams);
  }



  render() {
    const {
      memberListData, editorModalVisible, currentEditCategoryData, createModalVisible,
      pageSize,
      pageNum,
      cangdiList,
      total,
      searchParams,
      chargeRecordList
    } = this.props.memberList;

    const { categoryId } = this.props.match.params;

    const columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '会员级别',
      dataIndex: 'vipLevelString',
      key: 'vipLevelString',
    }, {
      title: '套餐类型',
      dataIndex: 'courseSetTypeDesc',
      key: 'courseSetTypeDesc',
    }, {
      title: '缴费总额',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    }, {
      title: '总共课时',
      dataIndex: 'courseTotalNumber',
      key: 'courseTotalNumber',
      // render: (val, record) => {
      //   <div>
      //     {record.nextLeaveStartTime}-{record.nextLeaveEndTime}
      //   </div>
      // }
    }, {
      title: '剩余课时',
      dataIndex: 'courseRemainingNumber',
      key: 'courseRemainingNumber',
    }, {
      title: '入会日期',
      dataIndex: 'joinTimeStr',
      key: 'joinTimeStr',
    }, {
      title: '会员到期时间',
      dataIndex: 'statusDesc',
      key: 'statusDesc',
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
          <a style={{ marginLeft:'12px'}} onClick={() => this.props.charge(record)}>充值</a>
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
        onChange: (page, pageSize) => this.props.getCategoryListData({...searchParams, size: pageSize, current: page})
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
          createModalVisible && <CreateModal
            // chargeRecordList={chargeRecordList}
            visible={createModalVisible}
            memberInfo={currentEditCategoryData}
            handleCancelCreate={this.props.handleCancelCreate}
            // onEditCallBack={this.getList}
            handleCreateCategory={this.props.saveRecord}
          />
        }
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
};

export default MemberList; 
