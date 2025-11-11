import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select, message, Checkbox, Radio } from 'antd';
import style from './style.scss';
import { requestCategory,  } from 'service/category';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

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
    const { visible, form, baseDate = {} } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsValue } = form;
    const typ = getFieldValue('commissionType')
    console.log(getFieldsValue(['commissionType','baseFee' ]))
    return (
        <Modal
          title='教练提成配置'
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            {
              [1, 2, 3].map(item => {
                return (
                  <div key={item} className={style.itembox}>
                    <h2 className={style.title}>高级教练课</h2>
                    <Form.Item {...formItemLayout} label="基础课时费">
                      {getFieldDecorator('baseFee' + item, {
                        initialValue: baseDate.baseFee,
                        rules: [{ required: true, message: '请输入场地名称' }],
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="提成方式">
                      {getFieldDecorator('commissionType' + item, {
                        initialValue: baseDate.commissionType || 1,
                      })(
                        <RadioGroup>
                          <Radio value={1}>百分比</Radio>
                          <Radio value={2}>固定</Radio>
                        </RadioGroup>
                      )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="提成数值">
                      {getFieldDecorator('commissionValue' + item, {
                        initialValue: baseDate.commissionValue || '',
                        rules: [{ required: true, message: '请输入提成数值' }],
                      })(<Input addonAfter={typ == 1 ? '%' : ''} />)}
                    </Form.Item>
                  </div>
                )
              })
            }
            
          </Form>
        </Modal>
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
