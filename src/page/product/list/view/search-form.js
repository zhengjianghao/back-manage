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
        let { productName } = values;
        if (!productName) productName = undefined;
        const { pageSize, pageNum } = this.props;
        this.props.getProductList('search', pageSize, pageNum, productName);
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { jiaoLianList = [] } = this.props
    return (
      <Form
        className="ant-advanced-search-form"
        layout="inline"
        onSubmit={this.handleSearch}
      >
         <FormItem label="教练">
          {getFieldDecorator('jiaolian', {
            // initialValue: '',
          })(
            <Select
              style={{ width: 150 }}
              placeholder="请选择教练"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => {
                return option.props.children.indexOf(input) != -1;
              }}
            >
              {(jiaoLianList && jiaoLianList).map((item) => {
                return (
                  <Option
                    value={item.id}
                  >{`${item.name}`}</Option>
                );
              })}
            </Select>
          )}
        </FormItem>
        <FormItem label="场地">
          {getFieldDecorator('cd')(
            <Select
              style={{ width: 150 }}
              showSearch
              placeholder="请选择场地"
              optionFilterProp="children"
              filterOption={(input, option) => {
                return option.props.children.indexOf(input) != -1;
              }}
            >
              {(jiaoLianList && jiaoLianList).map((item) => {
                return (
                  <Option
                    value={item.id}
                  >{`${item.name}`}</Option>
                );
              })}
            </Select>
          )}
        </FormItem>
        <FormItem label="场地">
          {getFieldDecorator('status')(
            <Select
              style={{ width: 100 }}
              placeholder="选择状态"
            >
              <Option value={''}>全部</Option>
              <Option value={0}>已预约</Option>
              <Option value={1}>未预约</Option>
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
  jiaoLianList: PropTypes.array
};

export default Form.create()(ProductSearchForm);
