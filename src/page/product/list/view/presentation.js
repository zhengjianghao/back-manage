import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Tabs } from 'antd';
import { Link } from 'react-router-dom';

import { productRoute } from 'util/route';
import PageWrapper from 'component/page-wrapper';
import SearchForm from './search-form';
import SearchForm2 from './search-form2';
import EditorModal from './edit-modal';

const TabPane = Tabs.TabPane;

class ProductList extends React.Component {
  componentDidMount() {
    document.title = '课程管理';
    const { searchParams, searchParams2 } = this.props.productList;
    this.props.getProductList(searchParams);
    this.props.getJiaoLianList()
    this.props.getCourtList()
  }

  getList = () => {
    const { productList } = this.props;
    this.props.getCourseTypeList(productList.searchParams2)
  }

  changeTab = (key) => {
    if (key == 2) {
      this.getList()
    }
  }

  render() {
    const {
      listType, productListData, total, productName, courList,searchParams, searchParams2, courseTypeList, editorModalVisible, currentEditCategoryData
    } = this.props.productList;
    const { size: pageSize, current: pageNum } = searchParams
    const { size: pageSize2, current: pageNum2 } = searchParams2
    const productStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    };

    const columns = [{
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '日期',
      dataIndex: 'subtitle',
      key: 'subtitle',
    }, {
      title: '时间',
      dataIndex: 'price1',
      key: 'price1',
    }, {
      title: '教练',
      dataIndex: 'jl',
      key: 'price',
    }, {
      title: '场地',
      dataIndex: 'cd',
      key: 'cd',
    }, {
      title: '学员',
      dataIndex: 'xy',
      key: 'xy',
    }, {
      title: '会员级别',
      dataIndex: 'hyjb',
      key: 'hyjb',
    }, {
      title: '总共课时',
      dataIndex: 'price3',
      key: 'price3',
    }, {
      title: '剩余课时',
      dataIndex: 'price2',
      key: 'price2',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        return (
          <div style={productStyle}>
            
          </div>
        );
      }
    }
    // , {
    //   title: '操作',
    //   key: 'action',
    //   width: 150,
    //   render: (text, record) => (
    //     <span>
    //       <Link to={`${productRoute.detail}/${record.id}`}>查看详情</Link>
    //       <span> | </span>
    //       <Link to={`${productRoute.editor}/${record.id}`}>编辑</Link>
    //     </span>
    //   )
    // }
  ];

  const columns2 = [{
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '课程类型',
      dataIndex: 'comboTypeDesc',
      key: 'comboTypeDesc',
    }, {
      title: '套课类型',
      dataIndex: 'courseSetTypeDesc',
      key: 'courseSetTypeDesc',
    }, {
      title: '上课节数',
      dataIndex: 'number',
      key: 'number',
    }, {
      title: '价格（元）',
      dataIndex: 'amount',
      key: 'amount',
    }, {
      title: '训练卡',
      dataIndex: 'trainingCardTypeDesc',
      key: 'trainingCardTypeDesc',
    }, {
      title: '操作',
      key: 'action',
      width: 150,
      render: (text, record) => (
        <div>
          <a onClick={() => this.props.handleOpenEditModal(record)}>编辑</a>
          <a style={{ marginLeft:'12px'}} onClick={() => this.props.delCourse({ id: record.id}, this.getList)}>删除</a>
        </div>
      )
    }
  ];

    const tableProps = {
      columns,
      dataSource: productListData,
      rowKey: 'id',
      pagination: {
        pageSize,
        current: pageNum,
        total,
        onChange: (page, pageSize) => this.props.getProductList({...searchParams, size: pageSize, current: page})
      }
    };

    const tableProps2 = {
      columns: columns2,
      dataSource: courseTypeList,
      rowKey: 'id',
      pagination: {
        pageSize: pageSize2,
        current: pageNum2,
        total,
        onChange: (page, pageSize) => this.props.getCourseTypeList({
          ...searchParams2,
          size: pageSize,
          current: page
        })
      }
    };

    return (
      <PageWrapper>
        <Tabs defaultActiveKey="1" onChange={this.changeTab}>
          <TabPane tab="课程安排" key="1">
            <SearchForm
              getProductList={this.props.getProductList}
              pageSize={pageSize}
              pageNum={pageNum}
              courList={courList}
            />
            {/* <div style={{ marginBottom: 30 }}>
              <Link to={productRoute.editor}>
                <Button type='primary'>新增</Button>
              </Link>
            </div> */}
            <Table {...tableProps} />
          </TabPane>
          <TabPane tab="课程管理" key="2">
            <SearchForm2
              getProductList={this.props.getCourseTypeList}
              pageSize={pageSize2}
              pageNum={pageNum2}
            />
            <div style={{ marginBottom: 30 }}>
              <Button type='primary' onClick={this.props.handleOpenCreateModal}>新增</Button>
            </div>
            <Table {...tableProps2} />
          </TabPane>
        </Tabs>
        {
          editorModalVisible &&
          <EditorModal
            editorModalVisible={editorModalVisible}
            currentEditCategoryData={currentEditCategoryData}
            handleCancelEdit={this.props.handleCancelEdit}
            handleCreateCategory={this.props.addCourse}
            handleEditCategoryName={this.props.updateCourse}
            onEditCallBack={this.getList}
          />
        }
        
      </PageWrapper>
    );
  }
}

ProductList.propTypes = {
  productList: PropTypes.object.isRequired,
  getProductList: PropTypes.func.isRequired,
};

export default ProductList; 
