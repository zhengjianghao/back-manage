import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

import PageWrapper from 'component/page-wrapper';
import { orderRoute } from 'util/route';
import SearchForm from './search-form';

class ProductList extends React.Component {
  componentDidMount() {
    document.title = '教练管理';
    this.props.getOrderList(10, 1);
  }

  render() {
    const {
      orderListData, pageSize, pageNum, total, searchParams
    } = this.props.orderList;

    const columns = [{
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    }, {
      title: '收件人',
      dataIndex: 'receiverName',
      key: 'receiverName',
    }, {
      title: '订单状态',
      dataIndex: 'statusDesc',
      key: 'statusDesc',
    }, {
      title: '订单总价',
      dataIndex: 'payment',
      key: 'payment',
      render: text => `￥${text}`
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: '操作',
      key: 'action',
      width: 150,
      render: (text, record) => (
        <span>
          <Link to={`${orderRoute.detail}/${record.orderNo}`}>查看详情</Link>
        </span>
      )
    }];

    const tableProps = {
      columns,
      dataSource: orderListData,
      rowKey: 'orderNo',
      pagination: {
        pageSize,
        current: pageNum,
        total,
        hideOnSinglePage: true,
        onChange: (page, pageSize) => this.props.getOrderList({...searchParams, size: pageSize, current: page})
      }
    };

    return (
      <PageWrapper>
        <SearchForm
          handleOrderSearch={this.props.handleOrderSearch}
          getOrderList={this.props.getOrderList}
        />
        <Table {...tableProps} />
      </PageWrapper>
    );
  }
}

ProductList.propTypes = {
  orderList: PropTypes.object.isRequired,
  getOrderList: PropTypes.func.isRequired,
  handleOrderSearch: PropTypes.func.isRequired,
};

export default ProductList; 
