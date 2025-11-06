import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select, message, Checkbox } from 'antd';

import { requestCategory,  } from 'service/category';

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const plainOptions = [
  { label: '球杆存放柜', value: '球杆存放柜' },
  { label: '休息区', value: '休息区' },
  { label: 'WIFI', value: 'WIFI' },
  { label: '淋浴间', value: '淋浴间' },
];
const CheckboxGroup = Checkbox.Group;

class CreateModal extends React.Component {
  state = {
    parentCategory: []
  }

  componentDidMount() {
    // this.getParentCategory();
  }

  handleOk = () => {
    const { onEditCallBack } = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleCreateCategory(values, onEditCallBack);
      }
    });
  }

  handleCancel = () => {
    this.props.handleCancelCreate();
  }

  /**
   * 生成选择器选项
   * @param {array} datas 选项数据
   */
  getSelectOptions = datas => {
    if (datas) {
      return datas.map(element => (
        <Select.Option value={element.id} key={element.id}>
          {element.name}
        </Select.Option>
      ));
    }
  }

  render() {
    const { visible, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <span>
        <Modal
          title='新增场地'
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item {...formItemLayout} label="场地名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入场地名称' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="场地类型" >
              {getFieldDecorator('type', {
                rules: [{
                  required: true, message: '此项为必填项',
                }],
              })(<Select
                onSelect={this.handleLevelOneCategorySelect}
                placeholder='请选择场地类型'
              >
                {this.getSelectOptions(this.state.parentCategory)}
              </Select>)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="场地容量">
              {getFieldDecorator('categoryName', {
                rules: [{ required: true, message: '请输入场地容量' }],
              })(<Input />)}
            </Form.Item>
            {/* <Form.Item {...formItemLayout} label="使用状态">
              {getFieldDecorator('status', {
                initialValue: 1,
              })(
                <RadioGroup>
                  <Radio value={1}>空闲</Radio>
                  <Radio value={2}>使用中</Radio>
                </RadioGroup>
              )}
            </Form.Item> */}
            <Form.Item {...formItemLayout} label="场地设施">
              {getFieldDecorator('cdss', {
                initialValue: [],
              })(
                <CheckboxGroup options={plainOptions} />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </span>
    );
  }
}

CreateModal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  handleCancelCreate: PropTypes.func.isRequired,
  handleCreateCategory: PropTypes.func.isRequired,
};

export default Form.create()(CreateModal);
