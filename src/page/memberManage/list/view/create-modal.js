import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select, Table, Checkbox, Button, InputNumber, DatePicker } from 'antd';
import { getJLList, addRecord, editRecord, getChareRecord } from 'service/category';
import { getAllKc } from 'service/product';

import moment from 'moment'
moment.locale('zh-cn')

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const { MonthPicker, RangePicker } = DatePicker;

const CheckboxGroup = Checkbox.Group;

class CreateModal extends React.Component {
  state = {
    parentCategory: [],
    isCharege: false,
    recordInfo: {},
    jiaoLianList: [],
    courseList: [],
    courseInfo: {}
  }

  componentDidMount() {
    this.getRecordList();
    this.getJiaoLian();
    this.getKC();
  }


  checkRecord = async (params) => {
    const funName = params.id ? editRecord : addRecord
    const {data} = await funName(params);
    this.setState({
      isCharege: false,
      recordInfo: {},
      courseInfo: {}
    })
    this.getRecordList()
  }

  handleOk = () => {
    const { onEditCallBack, memberInfo } = this.props
    const { recordInfo, courseInfo, isCharege } = this.state
    if (!isCharege) {
      this.handleCancel()
      return
    }
    const that = this
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { youxiaoqi, ...others } = values
        const { comboType, id: coachId } = courseInfo
        const params = {
          id: recordInfo.id || '',
          studentId: memberInfo.id,
          comboType,
          coachId,
          ...others,
        }
        if (comboType == 2) {
          const startTime = moment(youxiaoqi[0]).valueOf()
          const endTime = moment(youxiaoqi[1]).valueOf()
          params.startTime = startTime
          params.endTime = endTime
        }
        that.checkRecord(params)
        // this.props.handleCreateCategory(params, onEditCallBack);
      }
    });
  }

  getRecordList = async () => {
    const { memberInfo } = this.props
    const {data} = await getChareRecord(memberInfo.id);
    this.setState({
      chargeRecordList: data.records
    })
  }

  handleCancel = () => {
    this.props.handleCancelCreate();
  }


  getJiaoLian = async () => {
    const {data} = await getJLList({
      size: 1000,
      current: 1
    });
    this.setState({
      jiaoLianList: data.records
    })
  }

  getKC = async () => {
    const {data} = await getAllKc({
      name: ''
    });
    this.setState({
      courseList: data
    })
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

  charge = (info) => {
    const { courseList } = this.state
    const courseInfo = courseList.filter(i => i.id == info.courseId)
    this.setState({
      isCharege: true,
      recordInfo: info,
      courseInfo: courseInfo[0]
    })
  }

  addCharge = () => {
    this.setState({
      isCharege: true,
      recordInfo: {}
    })
  }

  cancelCharge = () => {
    this.setState({
      isCharege: false,
      recordInfo: {},
      courseInfo: {}
    })
  }

  changeCoourse = (val) => {
    const { courseList, recordInfo } = this.state
    const courseInfo = courseList.filter(i => i.id == val)
    const { setFieldsValue } = this.props.form

    recordInfo.courseAmount = courseInfo[0].amount
    if (courseInfo[0].comboType == 1) {
      recordInfo.courseCount = courseInfo[0].number
    }
    this.setState({
      courseInfo: courseInfo[0],
      recordInfo: {...recordInfo}
    })

  }

  render() {
    const { visible, form } = this.props;
    const { getFieldDecorator, getFieldsValue, getFieldValue } = form;
    const { isCharege, recordInfo, jiaoLianList, chargeRecordList, courseList, courseInfo } = this.state
    const columns = [{
      title: '记录Id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '套餐类型',
      dataIndex: 'comboTypeDesc',
      key: 'gencomboTypeDescderDesc',
    }, {
      title: '套课类型',
      dataIndex: 'courseSetTypeDesc',
      key: 'courseSetTypeDesc',
    }, {
      title: '充值金额',
      dataIndex: 'courseAmount',
      key: 'courseAmount',
    }, {
      title: '课时数量',
      dataIndex: 'courseCount',
      key: 'courseCount',
    }, {
      title: '训练卡',
      dataIndex: 'trainingCardTypeDesc',
      key: 'trainingCardTypeDesc',
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    }, {
      title: '操作',
      key: 'action',
      // width: 150,
      render: (text, record) => (
        <a onClick={this.charge.bind(this, record)}>续费</a>
      )
    }];
    const tableProps = {
      columns,
      dataSource: chargeRecordList,
      rowKey: 'id',
    };
    // const formVal = getFieldsValue(['comboType','baseFee' ])
    // const formCommissionType = getFieldValue('comboType') || 1
    const formCommissionType = courseInfo.comboType
    return (
      <span>
        <Modal
          title='充值记录'
          width={900}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{ marginBottom: 30 }}>
            {
              isCharege ? <Button type='primary' onClick={this.cancelCharge}>返回</Button> : <Button type='primary' onClick={this.addCharge}>充值</Button>
            }
          </div>
          {
            !isCharege ? <div>
              <Table {...tableProps} />
            </div> : 
            <Form>
              <Form.Item  {...formItemLayout} label="教练">
                {getFieldDecorator('coachId', {
                  initialValue: recordInfo.coachId || '',
                  rules: [{
                    required: true, message: '请选择教练',
                  }],
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
              </Form.Item>
              <Form.Item  {...formItemLayout} label="课程">
                {getFieldDecorator('courseId', {
                  initialValue: recordInfo.courseId || '',
                  rules: [{
                    required: true, message: '请选择课程',
                  }],
                  // initialValue: '',
                })(
                  <Select
                    style={{ width: 150 }}
                    placeholder="请选择课程"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => {
                      return option.props.children.indexOf(input) != -1;
                    }}
                    onChange={this.changeCoourse}
                  >
                    {(courseList && courseList).map((item) => {
                      return (
                        <Option
                          value={item.id}
                        >{`${item.name}`}</Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>

              {/* <Form.Item {...formItemLayout} label="套餐类型">
               {getFieldDecorator('comboType', {
                  initialValue: recordInfo.comboType || 1,
                  rules: [{
                    required: true, message: '请选择套餐类型',
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
              </Form.Item> */}
              {/* {
                formCommissionType == 1 &&
                <Form.Item {...formItemLayout} label="套课类型">
                {getFieldDecorator('courseSetType', {
                    initialValue: recordInfo.courseSetType || 1,
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
              } */}
              {
                courseInfo.id && <div>
                  <Form.Item {...formItemLayout} label="充值金额（元）">
                    {getFieldDecorator('courseAmount', {
                      initialValue: recordInfo.courseAmount || '',
                      rules: [{ required: true, message: '请输入金额' }],
                    })(<InputNumber />)}
                  </Form.Item>
                  {
                    formCommissionType == 1 &&
                    <Form.Item {...formItemLayout} label="课时数量">
                      {getFieldDecorator('courseCount', {
                        initialValue: recordInfo.courseCount || '',
                        rules: [{ required: formCommissionType == 1, message: '请输入课时数量' }],
                      })(<InputNumber />)}
                    </Form.Item>
                  }
                  {/* {
                    formCommissionType == 2 && 
                    <Form.Item {...formItemLayout} label="训练卡类型">
                    {getFieldDecorator('trainingCardType', {
                        initialValue: recordInfo.trainingCardType || 1,
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
                  } */}
                  {
                    formCommissionType == 2 &&
                    <Form.Item {...formItemLayout} label="训练卡有效期">
                      {getFieldDecorator('youxiaoqi', {
                        initialValue: recordInfo.startTime ? [moment(recordInfo.startTime), moment(recordInfo.endTime)] : [],
                        rules: [{ required: formCommissionType == 2, message: '请选择训练卡有效期' }],
                      })(
                        <RangePicker
                          size="default"
                          format="YYYY-MM-DD"
                          placeholder="请选择时间"
                        />
                      )}
                    </Form.Item>
                  }
                  <Form.Item {...formItemLayout} label="备注">
                    {getFieldDecorator('remark', {
                      initialValue: recordInfo.remark || '',
                    })(<Input placeholder="请输入备注" />)}
                  </Form.Item>

                </div>
              }
              
            </Form>
          }
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
