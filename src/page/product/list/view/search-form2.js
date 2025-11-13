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
        this.props.getProductList({...values, size: 10, current: 1});
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { courList = [] } = this.props
    return (
      <Form
        className="ant-advanced-search-form"
        layout="inline"
        onSubmit={this.handleSearch}
      >
        <FormItem label="课程名称">
          {getFieldDecorator('name')(<Input placeholder="请输入课程名称" />)}
        </FormItem>
        <FormItem label="课程类型">
          {getFieldDecorator('comboType')(
            <Select
              style={{ width: 100 }}
              placeholder="选择状态"
            >
              <Option value={''}>全部</Option>
              <Option value={1}>套课</Option>
              <Option value={2}>训练卡</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="套课类型">
          {getFieldDecorator('courseSetType')(
            <Select
              style={{ width: 100 }}
              placeholder="选择套课类型"
            >
              <Option value={''}>全部</Option>
              <Option value={1}>院长课</Option>
              <Option value={2}>主教练课</Option>
              <Option value={3}>教练课</Option>
              <Option value={4}>体验卡</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="训练卡类型">
          {getFieldDecorator('trainingCardType')(
            <Select
              style={{ width: 100 }}
              placeholder="选择训练卡"
            >
              <Option value={1}>周卡</Option>
              <Option value={2}>月卡</Option>
              <Option value={3}>季卡</Option>
              <Option value={4}>年卡</Option>
            </Select>
          )}
        </FormItem>
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
  courList: PropTypes.array
};

export default Form.create()(ProductSearchForm);
