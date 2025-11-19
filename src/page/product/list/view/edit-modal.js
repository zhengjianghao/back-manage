import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select, Radio, Checkbox, InputNumber } from 'antd';
import PicUploader from 'component/pic-uploader/index';
import moment from 'moment'
moment.locale('zh-cn')

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
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
const RadioGroup = Radio.Group;

class EditorModal extends React.Component {

  state = {
    parentCategory: [
      { name: '普通', id: 1 },
      { name: '白银', id: 2 },
      { name: '黄金', id: 3 },
      { name: '钻石', id: 4 },
    ]
  }
  handleOk = () => {
    const { handleEditCategoryName, onEditCallBack,currentEditCategoryData, handleCreateCategory } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { coverImageList } = values
        const _coverImageList = coverImageList.map(item => item.key)
        const params = {
          ...values,
          coverImageList: _coverImageList
        }
        if (currentEditCategoryData.id) {
          handleEditCategoryName({...currentEditCategoryData, ...params }, onEditCallBack);
        } else {
          handleCreateCategory({...params}, onEditCallBack)
        }
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
    const { getFieldDecorator, getFieldValue } = form;
     const formCommissionType = getFieldValue('comboType') || currentEditCategoryData.comboType || 1
     
    return (
      <span>
        <Modal
          title={`${currentEditCategoryData.id ? '修改' : '新增'}课程`}
          visible={editorModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item {...formItemLayout} label="课程名称">
              {getFieldDecorator('name', {
                initialValue: currentEditCategoryData.name || '',
                rules: [{
                  required: true, message: '请输入课程名称',
                }],
              })(<Input placeholder="请输入课程名称" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="课程图片">
              {getFieldDecorator('coverImageList', {
                rules: [{ required: true, message: '请上传课程图片！' }],
                initialValue:
                  currentEditCategoryData.coverImageList || []
              })(
                <PicUploader
                  value={currentEditCategoryData.coverImageList}
                  maxLength={10}
                  withOriginSize={false}
                  // onChange={(value) => {
                  //   this.changeHeader({
                  //     type: 'picture',
                  //     value: value[0]
                  //   })
                  // }}
                />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="课程类型">
              {getFieldDecorator('comboType', {
                initialValue: currentEditCategoryData.comboType || 1,
                rules: [{
                  required: true, message: '请选择课程类型',
                }],
              })(
                <Select
                  style={{ width: 150 }}
                  placeholder="选择类型"
                >
                  <Option value={1}>套课</Option>
                  <Option value={2}>训练卡</Option>
                </Select>
              )}
            </Form.Item>
            {
              formCommissionType == 1 &&
              <Form.Item {...formItemLayout} label="套课类型">
              {getFieldDecorator('courseSetType', {
                  initialValue: currentEditCategoryData.courseSetType || 1,
                  rules: [{
                    required: formCommissionType == 1, message: '请选择套课类型',
                  }],
                })(
                  <Select
                    style={{ width: 150 }}
                    placeholder="选择类型"
                  >
                    <Option value={1}>院长课</Option>
                    <Option value={2}>主教练课</Option>
                    <Option value={3}>教练课</Option>
                    <Option value={4}>体验课</Option>
                  </Select>
                )}
              </Form.Item>
            }
            <Form.Item {...formItemLayout} label="充值金额（元）">
              {getFieldDecorator('amount', {
                initialValue: currentEditCategoryData.amount || '',
                rules: [{ required: true, message: '请输入金额' }],
              })(<InputNumber />)}
            </Form.Item>
            {
              formCommissionType == 1 &&
              <Form.Item {...formItemLayout} label="课时数量">
                {getFieldDecorator('number', {
                  initialValue: currentEditCategoryData.number || '',
                  rules: [{ required: formCommissionType == 1, message: '请输入课时数量' }],
                })(<InputNumber />)}
              </Form.Item>
            }
            {
              formCommissionType == 2 && 
              <Form.Item {...formItemLayout} label="训练卡类型">
              {getFieldDecorator('trainingCardType', {
                  initialValue: currentEditCategoryData.trainingCardType || 1,
                  rules: [{
                    required: formCommissionType == 2, message: '请选择训练卡类型',
                  }],
                })(
                  <Select
                    style={{ width: 150 }}
                    placeholder="选择类型"
                  >
                    <Option value={1}>周卡</Option>
                    <Option value={2}>月卡</Option>
                    <Option value={3}>季卡</Option>
                    <Option value={4}>年卡</Option>
                  </Select>
                )}
              </Form.Item>
            }
            <Form.Item {...formItemLayout} label="课程描述">
              {getFieldDecorator('description', {
                initialValue: currentEditCategoryData.description || '',
              })(<Input placeholder="请输入课程描述" />)}
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
