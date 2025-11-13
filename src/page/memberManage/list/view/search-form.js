import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Col, Input, Button } from 'antd';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const FormItem = Form.Item;
const { Option } = Select;

class ProductSearchForm extends React.Component {
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // let { productName } = values;
        // if (!productName) productName = undefined;
        // const { pageSize, pageNum } = this.props;
        this.props.getProductList({...values, size: 10, current: 1 });
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { cangdiList = [] } = this.props
    return (
      <Form
        className="ant-advanced-search-form"
        layout="inline"
        onSubmit={this.handleSearch}
      >
        <FormItem label="会员名称" >
          {getFieldDecorator('name', {
            initialValue: '',
          })(<Input placeholder="请输入会员名称" />)}
        </FormItem>
        <FormItem label="会员手机号" >
          {getFieldDecorator('phone', {
            initialValue: '',
          })(<Input placeholder="请输入会员手机号" />)}
        </FormItem>
        <FormItem label="会员性别">
          {getFieldDecorator('gender', {
            initialValue: '',
          })(
            <Select
              style={{ width: 150 }}
              placeholder="选择类型"
            >
              <Option value={''}>全部</Option>
              <Option value={1}>男</Option>
              <Option value={2}>女</Option>
            </Select>
          )}
        </FormItem>
        {/* <FormItem label="会员名称">
          {getFieldDecorator('name', {
            initialValue: '',
          })(
            <Select
              style={{ width: 150 }}
              showSearch
              placeholder="请选择会员"
              optionFilterProp="children"
              filterOption={(input, option) => {
                return option.props.children.indexOf(input) != -1;
              }}
            >
              {(cangdiList && cangdiList).map((item) => {
                return (
                  <Option
                    value={item.id}
                  >{`${item.name}`}</Option>
                );
              })}
            </Select>
          )}
        </FormItem> */}
        {/* <FormItem label="会员级别">
          {getFieldDecorator('type', {
            initialValue: '',
          })(
            <Select
              style={{ width: 150 }}
              placeholder="选择类型"
            >
              <Option value={''}>全部</Option>
              <Option value={1}>中级</Option>
              <Option value={2}>高级</Option>
              <Option value={3}>特级</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="会员状态">
          {getFieldDecorator('status', {
            initialValue: '',
          })(
            <Select
              style={{ width: 150 }}
              placeholder="会员状态"
            >
              <Option value={''}>全部</Option>
              <Option value={1}>试用</Option>
              <Option value={2}>在岗</Option>
              <Option value={3}>休假</Option>
              <Option value={4}>离职</Option>
            </Select>
          )}
        </FormItem> */}
        <FormItem>
          <Button type="primary" htmlType="submit">搜索</Button>
          {/* <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
            清空
          </Button> */}
        </FormItem>
      </Form>
    );
  }
}

ProductSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  getProductList: PropTypes.func.isRequired,
};

export default Form.create()(ProductSearchForm);
