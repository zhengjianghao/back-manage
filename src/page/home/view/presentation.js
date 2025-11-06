// 首页组件
import React from 'react';
import { Row, Col, Button, Modal, Form, Select } from 'antd';
import PropTypes from 'prop-types';

import { productRoute, userRoute, orderRoute } from 'util/route.js';
import PageWrapper from 'component/page-wrapper';
import Card from './card.js';
import style from './style.scss';
const weeks = ['周天', '周一', '周二', '周三', '周四', '周五', '周六']
const FormItem = Form.Item;
const { Option } = Select;
const AddModal = Form.create()((props) => {
  const {
    showEditModal,
    onAddAttr,
    onClose,
    form,
    jiaoLianList = [],
  } = props;
  const { getFieldDecorator } = form;
  return (
    <Modal
      title="添加课程"
      visible={showEditModal}
      onOk={onAddAttr}
      onCancel={onClose}
      okText="确认"
      cancelText="取消"
    >
      <Form layout="inline">
        <FormItem label="教练">
          {getFieldDecorator('jiaolian', {
            // initialValue: '',
          })(
            <Select
              style={{ width: 200 }}
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
              style={{ width: 200 }}
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
      </Form>
    </Modal>
  );
});


class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  componentDidMount() {
    document.title = '首页';
    this.props.getStatisticData();
    this.props.getJiaoLianList();
  }

  saveFormRef = (form) => {
    this.form = form;
  };

  showAddModal = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = () => {

  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { home } = this.props;
    const { statisticData, jiaoLianList } = home;
    const { userCount, orderCount, productCount } = statisticData;

    return (
      <PageWrapper showBackgroundColor={false}>
        <Row gutter={40}>
          <Col span={6}>
            <Card title='今日课程' num={userCount} linkTo={userRoute.list} />
          </Col>
          <Col span={6}>
            <Card title='场地使用率' num={productCount} linkTo={productRoute.list} />
          </Col>
          <Col span={6}>
            <Card title='上课数量最多' num={orderCount} linkTo={orderRoute.list} />
          </Col>
          <Col span={6}>
            <Card title='生日提醒' num={orderCount} linkTo={orderRoute.list} />
          </Col>
        </Row>
        <div className={style.weekBox}>
          <div className={style.titleBox}>
            <div className={style.weekBoxTitle}>本周课程安排</div>
            <Button type="primary" onClick={this.showAddModal} className={style.weekBtn}>新增课程</Button>
          </div>
          <div className={style.kcBox}>
            {
              [1,2,3,4,5,6,7].map(item => {
                return (
                  <div key={item} className={style.weekdayItemBox}>
                    <div className={style.weekday}>
                        周一10/2
                    </div>
                    <div className={style.weekdayKc}>
                        09:30-11:00 私人课程（李教练）
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className={style.weekBox}>
          <div className={style.weekBoxTitle}>场地状态</div>
          <div className={style.cdBox}>
            {
              [1,2,3].map(item => {
                return (
                  <div key={item} className={style.cdItemCard}>
                    <div className={style.cdName}>1号场地</div>
                    <div className={style.cdDate}>下一预约: 14:00-16:00</div>
                    <div className={style.cdFZR}>负责人：xxx</div>
                    <div className={`${style.cdType} ${item == 1 && style.cdType2}`}>{item == 1 ? '使用中' : '空闲'}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
        {/* <Modal
          title="新建课程"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >

        </Modal> */}

        <AddModal
          showEditModal={this.state.visible}
          ref={this.saveFormRef}
          onAddAttr={this.handleOk}
          onClose={this.handleCancel}
          jiaoLianList={jiaoLianList}
        />
      </PageWrapper>
    );
  }
}

Home.propTypes = {
  home: PropTypes.object.isRequired,
  getStatisticData: PropTypes.func.isRequired,
};

export default Home;
