import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

import { categoryRoute } from 'util/route';
import EditorModal from './edit-modal';
import CreateModal from './create-modal';
import PageWrapper from 'component/page-wrapper';
import SearchForm from './search-form';

class CategoryList extends React.Component {
  componentDidMount() {
    document.title = '场地管理';
    this.getList()
  }

  getColumn = () => {

  }

  getList = () => {
    const { getCategoryListData, categoryList } = this.props;
    getCategoryListData(categoryList.searchParams);
  }



  render() {
    const {
      categoryListData, editorModalVisible, currentEditCategoryData, createModalVisible,
      pageSize,
      pageNum,
      cangdiList,
      total,
      searchParams
    } = this.props.categoryList;

    const { categoryId } = this.props.match.params;

    const columns = [{
      title: '场地名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '类型',
      dataIndex: 'typtypeDesce',
      key: 'typeDesc',
    }, {
      title: '容量',
      dataIndex: 'capacity',
      key: 'capacity',
    }, {
      title: '设施',
      dataIndex: 'facility',
      key: 'facility',
    }, {
      title: '当前状态',
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
      dataSource: categoryListData,
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

CategoryList.propTypes = {
  match: PropTypes.object.isRequired,
  categoryList: PropTypes.object.isRequired,
  getCategoryListData: PropTypes.func.isRequired,
  handleOpenEditModal: PropTypes.func.isRequired,
  handleEditCategoryName: PropTypes.func.isRequired,
  handleCancelEdit: PropTypes.func.isRequired,
  handleOpenCreateModal: PropTypes.func.isRequired,
  handleCancelCreate: PropTypes.func.isRequired,
  handleCreateCategory: PropTypes.func.isRequired,
};

export default CategoryList; 
