import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select, message, Checkbox } from 'antd';

const formItemLayout = {
  labelCol: {
    sm: { span: 4 },
  },
  wrapperCol: {
    sm: { span: 16 },
  },
};
const plainOptions = [
  { label: '球杆存放柜', value: '球杆存放柜' },
  { label: '休息区', value: '休息区' },
  { label: 'WIFI', value: 'WIFI' },
  { label: '淋浴间', value: '淋浴间' },
];
const CheckboxGroup = Checkbox.Group;

class EditorModal extends React.Component {

  state = {
    parentCategory: []
  }
  handleOk = () => {
    const { handleEditCategoryName, onEditCallBack } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // const { parentId, id } = currentEditCategoryData;
        handleEditCategoryName(values, onEditCallBack);
      }
    });
  }

  handleCancel = () => {
    this.props.handleCancelEdit();
  }

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
    const { editorModalVisible, currentEditCategoryData, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <span>
        <Modal
          title={`修改场地`}
          visible={editorModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item {...formItemLayout} label="场地名称">
              {getFieldDecorator('name', {
                initialValue: currentEditCategoryData.name,
                rules: [{ required: true, message: '请输入场地名称' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="场地类型" >
              {getFieldDecorator('type', {
                initialValue: currentEditCategoryData.type,
                rules: [{
                  required: true, message: '此项为必填项',
                }],
              })(<Select
                placeholder='请选择场地类型'
              >
                {this.getSelectOptions(this.state.parentCategory)}
              </Select>)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="场地容量">
              {getFieldDecorator('capacity', {
                initialValue: currentEditCategoryData.capacity,
                rules: [{ required: true, message: '请输入场地容量' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="场地设施">
              {getFieldDecorator('cdss', {
                initialValue: currentEditCategoryData.facility ? currentEditCategoryData.facility.split(',') : [],
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

EditorModal.propTypes = {
  form: PropTypes.object.isRequired,
  editorModalVisible: PropTypes.bool.isRequired,
  currentEditCategoryData: PropTypes.object.isRequired,
  handleCancelEdit: PropTypes.func.isRequired,
  handleEditCategoryName: PropTypes.func.isRequired,
};

export default Form.create()(EditorModal);
