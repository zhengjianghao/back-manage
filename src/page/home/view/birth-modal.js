import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select, Table, Checkbox, Button, InputNumber, DatePicker } from 'antd';
import { getJLList, addRecord, editRecord, getChareRecord } from 'service/category';

import moment from 'moment'
moment.locale('zh-cn')

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const { MonthPicker, RangePicker } = DatePicker;

const CheckboxGroup = Checkbox.Group;

class BirthModal extends React.Component {
  state = {
    
  }

  componentDidMount() {
  }



  handleCancel = () => {
    this.props.handleCancelCreate();
  }


  render() {
    const { visible, birthList } = this.props;
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
      title: '入会日期',
      dataIndex: 'joinTimeStr',
      key: 'joinTimeStr',
    }, {
      title: '会员到期时间',
      dataIndex: 'statusDesc',
      key: 'statusDesc',
    }];
    const tableProps = {
      columns,
      dataSource: birthList,
    };
    return (
      <span>
        <Modal
          title='本周生日会员'
          width={900}
          visible={visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <Table {...tableProps} />
        </Modal>
      </span>
    );
  }
}

BirthModal.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default Form.create()(BirthModal);
