// 首页组件
import React from 'react';
import { Row, Col, Button, Modal, Form, Select, Card } from 'antd';
import PropTypes from 'prop-types';

import { productRoute, userRoute, orderRoute } from 'util/route.js';
import PageWrapper from 'component/page-wrapper';
import BirthModal from './birth-modal';
// import Card from './card.js';
import style from './style.scss';
import moment from 'moment'
moment.locale('zh-cn')

const weeks = ['周天', '周一', '周二', '周三', '周四', '周五', '周六']
// 简单使用 - 周一为开始
function getThisWeekRange() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0-6 (周日-周六)
  
  const start = new Date(today);
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 周一为开始
  start.setDate(today.getDate() - diff);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  
  return {
    start: start.toLocaleDateString('zh-CN'),
    end: end.toLocaleDateString('zh-CN'),
    startDate: start,
    endDate: end
  };
}

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
      visible: false,
      todayWeekInfo: {}
    }
  }

  componentDidMount() {
    document.title = '首页';
    const todayWeekInfo = getThisWeekRange()
    this.setState({
      todayWeekInfo
    })
    this.props.getStatisticData();
    this.props.getBirthDay();
    this.props.getCdStatus();
    this.props.getKCList({
      startTime: moment(todayWeekInfo.start).valueOf(),
      endTime: moment(todayWeekInfo.end).valueOf(),
    });
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
    const { homeData, jiaoLianList, birthList, showBirthModal, kcList, cdList } = home;
    return (
      <PageWrapper className={style.pageBox} showBackgroundColor={false}>
        <Row gutter={40}>
          <Col span={6}>
            <Card style={{ height: '150px' }} bordered={true} hoverable title='今日课程' >
              <div>
                <div className={style.cardText}>
                  {homeData.todayTotalClassCount}
                </div>
                <div className={`${style.cardText} ${homeData.classIncreasePercent > 0 ? style.cardTextRed : style.cardTextGreen}`}>
                  较昨日{homeData.classIncreasePercent}%
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ height: '150px' }} bordered={true} hoverable title='场地使用率' >
              <div>
                <div className={style.cardText}>
                  {homeData.todayCourtUsagePercent}
                </div>
                <div className={`${style.cardText} ${homeData.courtUsageIncreasePercent > 0 ? style.cardTextRed : style.cardTextGreen}`}>
                  较昨日{homeData.courtUsageIncreasePercent}%
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ height: '150px' }} bordered={true} hoverable title='上课数量最多' >
              <div>
                <div className={style.cardText}>
                  {homeData.completeClassMostStudentName}史蒂夫
                </div>
                <div className={`${style.cardText} ${style.cardTextRed}`}>
                  {homeData.completeClassMostCount}节
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card onClick={this.props.showBirth} style={{ height: '150px' }} bordered={true} hoverable title='本周生日' >
              <div>
                <div className={style.cardText}>
                  {homeData.studentBirthdayInThisWeekCount}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <div className={style.weekBox}>
          <div className={style.titleBox}>
            <div className={style.weekBoxTitle}>本周课程安排</div>
            {/* <Button type="primary" onClick={this.showAddModal} className={style.weekBtn}>新增课程</Button> */}
          </div>
          <div className={style.kcBox}>
            {
              kcList.map(item => {
                return (
                  <div key={item} className={style.weekdayItemBox}>
                    <div className={style.weekday}>
                        {item.weekday}{moment(item.date).format('MM/DD')}
                    </div>
                    {
                      item.schedules.map(sc => {
                        return <div className={style.weekdayKc}>
                        {
                          sc.reserveStartTime
                        }-{sc.reserveEndTime} {sc.course.name} （{sc.coach.name}）
                          {/* 09:30-11:00 私人课程（李教练） */}
                      </div>
                      })
                    }
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
              cdList.map(item => {
                return (
                  <div key={item.id} className={style.cdItemCard}>
                    <div className={style.cdName}>
                      {item.name}
                    </div>
                    {
                      item.nextSchedule ? <div className={style.cdDate}>
                        下一预约：
                        {item.nextSchedule.reserveStartTime}-{item.nextSchedule.reserveEndTime}
                      </div> : <div className={style.cdDate}>
                        下一预约: 未安排
                      </div>
                    }
                    <div className={style.cdFZR}>负责人：{ item.nextSchedule ? item.nextSchedule.coach.name : '-'}</div>
                    <div className={`${style.cdType} ${item.status != 1 && style.cdType2}`}>{item.statusDesc}</div>
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

        {/* <AddModal
          showEditModal={this.state.visible}
          ref={this.saveFormRef}
          onAddAttr={this.handleOk}
          onClose={this.handleCancel}
          jiaoLianList={jiaoLianList}
        /> */}
        {
          showBirthModal && <BirthModal
            birthList={birthList}
            visible={showBirthModal}
            handleCancelCreate={this.props.hideBirthModal}
          />
        }
      </PageWrapper>
    );
  }
}

Home.propTypes = {
  home: PropTypes.object.isRequired,
  getStatisticData: PropTypes.func.isRequired,
};

export default Home;
