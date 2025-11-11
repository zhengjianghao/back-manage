import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

import { productRoute } from 'util/route';
import PageWrapper from 'component/page-wrapper';
import SearchForm from './search-form';

class ProductList extends React.Component {
  componentDidMount() {
    document.title = '课程管理';
    const { searchParams } = this.props.productList;
    this.props.getProductList(searchParams);
    this.props.getJiaoLianList()
  }


  render() {
    const {
      listType, productListData, pageSize, pageNum, total, productName, jiaoLianList
    } = this.props.productList;

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

    const tableProps = {
      columns,
      dataSource: productListData,
      rowKey: 'id',
      pagination: {
        pageSize,
        current: pageNum,
        total,
        onChange: (page, pageSize) => this.props.getProductList(listType, pageSize, page, productName)
      }
    };

    return (
      <PageWrapper>
        <SearchForm
          getProductList={this.props.getProductList}
          pageSize={pageSize}
          pageNum={pageNum}
          jiaoLianList={jiaoLianList}
        />
        {/* <div style={{ marginBottom: 30 }}>
          <Link to={productRoute.editor}>
            <Button type='primary'>新增</Button>
          </Link>
        </div> */}
        <Table {...tableProps} />
      </PageWrapper>
    );
  }
}

ProductList.propTypes = {
  productList: PropTypes.object.isRequired,
  getProductList: PropTypes.func.isRequired,
};

export default ProductList; 
