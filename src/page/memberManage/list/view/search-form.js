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
        this.props.getProductList({...values});
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
        <FormItem label="会员名称">
          {getFieldDecorator('cd')(
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
        </FormItem>
        <FormItem label="会员级别">
          {getFieldDecorator('type')(
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
          {getFieldDecorator('status')(
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
  pageSize: PropTypes.number.isRequired,
  pageNum: PropTypes.number.isRequired,
};

export default Form.create()(ProductSearchForm);
