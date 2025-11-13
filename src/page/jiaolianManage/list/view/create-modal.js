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
    const { onEditCallBack, baseDate,  } = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const configList = baseDate.configList.map((item, index) => {
          return {
            ...item,
            baseFee: values['baseFee'+index],
            commissionType: values['commissionType'+index],
            commissionValue: values['commissionValue'+index]
          }
        })
        this.props.handleCreateCategory({ configList }, onEditCallBack);
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
    const formVals = getFieldsValue(['commissionType0', 'commissionType1', 'commissionType2'])
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
              baseDate.configList.map((item, index) => {
                return (
                  <div key={item.id} className={style.itembox}>
                    <h2 className={style.title}>高级教练课</h2>
                    <Form.Item {...formItemLayout} label="基础课时费">
                      {getFieldDecorator('baseFee' + index, {
                        initialValue: item.baseFee,
                        rules: [{ required: true, message: '请输基础课时费' }],
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="提成方式">
                      {getFieldDecorator('commissionType' + index, {
                        initialValue: item.commissionType,
                      })(
                        <RadioGroup>
                          <Radio value={1}>百分比</Radio>
                          <Radio value={2}>固定</Radio>
                        </RadioGroup>
                      )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="提成数值">
                      {getFieldDecorator('commissionValue' + index, {
                        initialValue: item.commissionValue || '',
                        rules: [{ required: true, message: '请输入提成数值' }],
                      })(<Input addonAfter={formVals['commissionType' + index] == 1 ? '%' : ''} />)}
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
