import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select, Radio, Checkbox, Icon } from 'antd';
import PicUploader from 'component/pic-uploader/index'

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
      { name: '中级', id: 1 },
      { name: '高级', id: 2 },
      { name: '特级', id: 3 },
    ]
  }
  handleOk = () => {
    const { handleEditCategoryName, onEditCallBack, currentEditCategoryData, handleCreateCategory } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // const { parentId, id } = currentEditCategoryData;
        const avatar = values.avatar[0]
        if (currentEditCategoryData.id) {
          handleEditCategoryName({...currentEditCategoryData, ...values, avatar }, onEditCallBack);
        } else {
          handleCreateCategory({...values, avatar}, onEditCallBack)
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

  changeCreateActivityData = ({type, value }) => {
    console.log(type, value)
  }

  render() {
    const { editorModalVisible, currentEditCategoryData, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <span>
        <Modal
          title={`${currentEditCategoryData.id ? '修改' : '新增'}教练`}
          visible={editorModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item {...formItemLayout} label="教练名称">
              {getFieldDecorator('name', {
                initialValue: currentEditCategoryData.name,
                rules: [{ required: true, message: '请输入教练名称' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="教练级别" >
              {getFieldDecorator('level', {
                initialValue: currentEditCategoryData.level,
                rules: [{
                  required: true, message: '此项为必填项',
                }],
              })(<Select
                placeholder='请选择教练级别'
              >
                {this.getSelectOptions(this.state.parentCategory)}
              </Select>)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="教练手机号">
              {getFieldDecorator('phone', {
                initialValue: currentEditCategoryData.phone,
                rules: [{ required: true, message: '请输入教练手机号' }],
              })(<Input />)}
            </Form.Item>
            {/* <Form.Item
              {...formItemLayout}
              label="头像"
            >
              {getFieldDecorator('avatar', {
                initialValue: [],
                rules: [{ required: true, message: '请上传图片！' }]
              })(
                <Upload />
              )}
            </Form.Item> */}
            <Form.Item {...formItemLayout} label="头像2">
              {getFieldDecorator('avatar', {
                rules: [{ required: true, message: '请上传头像！' }],
                initialValue:
                  currentEditCategoryData.avatar ? ([currentEditCategoryData && currentEditCategoryData.avatar]) : []
              })(
                <PicUploader
                  value={[currentEditCategoryData.avatar]}
                  maxLength={1}
                  withOriginSize={false}
                  forBanner={true}
                  // onChange={(value) => {
                  //   this.changeHeader({
                  //     type: 'picture',
                  //     value: value[0]
                  //   })
                  // }}
                />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="教练性别">
              {getFieldDecorator('gender', {
                initialValue: currentEditCategoryData.gender || 1,
              })(
                <RadioGroup>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </RadioGroup>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="教练年龄">
              {getFieldDecorator('age', {
                initialValue: currentEditCategoryData.age,
                rules: [{ required: true, message: '请输入教练年龄' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="教练职称">
              {getFieldDecorator('title', {
                initialValue: currentEditCategoryData.title,
                rules: [{ required: true, message: '请输入教练职称' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="教练专长">
              {getFieldDecorator('speciality', {
                initialValue: currentEditCategoryData.speciality,
                rules: [{ required: true, message: '请输入教练专长' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="教练状态">
              {getFieldDecorator('status', {
                initialValue: currentEditCategoryData.status || 1,
              })(
                <RadioGroup>
                  <Radio value={1}>试用</Radio>
                  <Radio value={2}>在岗</Radio>
                  <Radio value={3}>休假</Radio>
                  <Radio value={4}>离职</Radio>
                </RadioGroup>
              )}
            </Form.Item>
            {/* <Form.Item {...formItemLayout} label="教练设施">
              {getFieldDecorator('cdss', {
                initialValue: currentEditCategoryData.facility ? currentEditCategoryData.facility.split(',') : [],
              })(
                <CheckboxGroup options={plainOptions} />
              )}
            </Form.Item> */}
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
