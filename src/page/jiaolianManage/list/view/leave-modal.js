import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select, Tabs, Checkbox, Radio, DatePicker, Table, Button } from 'antd';
import style from './style.scss';
import PicUploader from 'component/pic-uploader/index';
import { getLeave } from 'service/category';
import moment from 'moment'
moment.locale('zh-cn')

const TabPane = Tabs.TabPane;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const { MonthPicker, RangePicker } = DatePicker;

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

class LeaveModal extends React.Component {
  state = {
    parentCategory: []
  }

  componentDidMount() {
    // this.getParentCategory();
  }

  handleOk = () => {
    const { onEditCallBack, currentEditCategoryData } = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { leaveDate, ...others } = values
        const startTime = moment(leaveDate[0]).valueOf()
        const endTime = moment(leaveDate[1]).valueOf()
        const params = {
          ...others,
          startTime,
          endTime,
          coachId: currentEditCategoryData.id
        }
        this.props.handleCreateCategory(params, onEditCallBack);
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

  changeTab = (key) => {
    if (key == 2) {
      this.getLeaveList()
    }
  }

  getLeaveList = async () => {
    const { currentEditCategoryData } = this.props
    const {data} = await getLeave({
      size: 1,
      current: 100,
      coachId: currentEditCategoryData.id
    });
    if (data.code == 200) {
      this.setState({
        leaveList: data.records
      })
    }
  }

  render() {
    const { visible, form, baseDate = {} } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsValue } = form;
    const { leaveList } = this.state
    const columns = [{
      title: '请假类型',
      dataIndex: 'leaveTypeDesc',
      key: 'leaveTypeDesc',
    }, {
      title: '请假时间',
      dataIndex: 'leaveDate',
      key: 'leaveDate',
      render: (val, record) => {
        <div>
          {record.startTimeStr}-{record.endTimeStr}
        </div>
      }
    }, {
      title: '请假原因',
      dataIndex: 'reason',
      key: 'reason',
    }, {
      title: '附件',
      dataIndex: 'attachmentUrlList',
      key: 'attachmentUrlList',
      render: (val, record) => {
        <div>
          {
            val && val.map(item => item)
          }
        </div>
      }
    }];

    const tableProps = {
      columns,
      dataSource: leaveList,
    };

    return (
        <Modal
          title='请假管理'
          width={800}
          visible={visible}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Tabs defaultActiveKey="1" onChange={this.changeTab}>
            <TabPane tab="请假申请" key="1">
              <Form>
                <Form.Item {...formItemLayout} label="请假类型">
                    {getFieldDecorator('leaveType', {
                      initialValue: '',
                      rules: [{ required: true, message: '请选择请假类型' }],
                    })(
                      <Select
                        style={{ width: 150 }}
                        placeholder="选择类型"
                      >
                        <Option value={1}>病假</Option>
                        <Option value={2}>事假</Option>
                        <Option value={3}>公出</Option>
                        <Option value={4}>其他</Option>
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="请个假时间">
                    {getFieldDecorator('leaveDate', {
                      rules: [{ required: true, message: '请选择请假时间' }],
                    })(
                      <RangePicker
                        size="default"
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择时间"
                      />
                    )}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="请假原因">
                    {getFieldDecorator('reason', {
                      rules: [{ required: true, message: '请输入请假原因' }],
                    })(<Input placeholder="请输入请假原因" />)}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="相关附件">
                    {getFieldDecorator('attachmentList')(
                      <PicUploader
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
                  <div style={{ float: 'right' }}>
                    <Button style={{ marginRight: '10px' }} type="primary" onClick={this.handleOk}>确认</Button>
                    <Button onClick={this.handleCancel}>关闭</Button>
                  </div>
                </Form>
            </TabPane>
            <TabPane tab="请假记录" key="2">
              <Table {...tableProps} />
            </TabPane>
          </Tabs>
          
        </Modal>
    );
  }
}

LeaveModal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  handleCancelCreate: PropTypes.func.isRequired,
  handleCreateCategory: PropTypes.func.isRequired,
};

export default Form.create()(LeaveModal);
