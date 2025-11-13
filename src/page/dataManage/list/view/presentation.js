import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button, Card, Radio } from 'antd';
import { Link } from 'react-router-dom';
import style from './style.scss';

// import Card from './card.js';

import PageWrapper from 'component/page-wrapper';
import * as echarts from 'echarts';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

// 基于准备好的dom，初始化echarts实例
// var myChart = echarts.init(document.getElementById('main'));
// // 绘制图表
// myChart.setOption({
//   title: {
//     text: 'ECharts 入门示例'
//   },
//   tooltip: {},
//   xAxis: {
//     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
//   },
//   yAxis: {},
//   series: [
//     {
//       name: '销量',
//       type: 'bar',
//       data: [5, 20, 36, 10, 10, 20]
//     }
//   ]
// });

class DataList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fillerDate: '1',
    }
  }

  componentDidMount() {
    document.title = '数据统计';
    // this.myChart = echarts.init(document.getElementById('line-chart'));
    this.myChartBar = echarts.init(document.getElementById('bar-chart'));
    // this.setLineChart()
    this.setBarChart()
    const { fillerDate } = this.state
    const that = this
    // setTimeout(() => {
    //   that.myChartBar.setOption({
    //     xAxis: {
    //       data: ['李教练', '郑教练']
    //     },
    //     series: [{
    //       name: '上课数',
    //       type: 'bar',
    //       data: [120, 200],
    //       itemStyle: {
    //         color: '#5470c6'
    //       }
    //     }]
    //   })
    // }, 1000);
    this.getPageData(fillerDate)
    
  }

  getPageData = (statisticsType) => {
    this.props.getData({
      statisticsType: statisticsType
    }, (info) => {
      that.myChartBar.setOption({
        xAxis: {
          data: info.xData
        },
        series: [{
          name: '上课数',
          type: 'bar',
          data: info.data,
          itemStyle: {
            color: '#5470c6'
          }
        }]
      })
    })
  }
  
  setLineChart = () => {
    const option = {
    title: {
      text: 'Stacked Line'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
      top: 'top'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'category',
      data: ['20%', '40%', '60%', '80%', '100%']
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: ['20%', '30%', '20%', '100%', '10%', '1%', '0']
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };
    this.myChart.setOption(option);
  }
   
  setBarChart = () => {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      xAxis: {
        type: 'category'
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: []
    };
    this.myChartBar.setOption(option);
  }


  getColumn = () => {

  }


  changeDate = (e) => {
    this.setState({
      fillerDate: e.target.value
    })
    this.getPageData(e.target.value)
  }

  render() {
    const {
      allData
    } = this.props.dataList;
    const { fillerDate } = this.state
    const columns = [{
      title: '教练姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '本月上课数',
      dataIndex: 'completeCourseCount',
      key: 'completeCourseCount',
    }, {
      title: '总提成',
      dataIndex: 'commissionValue',
      key: 'commissionValue',
    }];

    const tableProps = {
      columns,
      dataSource: allData.coachCommissionStatisticList || [],
    };
    
    return (
      <PageWrapper>
        <RadioGroup style={{ marginBottom: '12px' }} onChange={this.changeDate} value={fillerDate}>
          <RadioButton value="1">日</RadioButton>
          <RadioButton value="2">月</RadioButton>
          <RadioButton value="3">年</RadioButton>
        </RadioGroup>
        <Row style={{ marginBottom: '12px' }} gutter={40}>
          <Col span={8}>
            <Card bordered={true} hoverable title='总上课书' >
              <div>
                <p className={style.cardText}>
                  {allData.completeCourseTotalCount}
                </p>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={true} hoverable title='总提成金额' >
              <div>
                <p className={style.cardText}>
                  {allData.commissionValueTotalAmount}
                </p>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={true} hoverable title='平均教练提成' >
              <div>
                <p className={style.cardText}>
                  {allData.coachAverageCommissionValue}
                </p>
              </div>
            </Card>
          </Col>
        </Row>
        <h2>教练上课量统计</h2>
        <div id='bar-chart' style={{ width: '100%', height: '400px', marginBottom: '20px'}}></div>
        {/* <div id='line-chart' style={{ width: '100%', height: '400px'}}></div> */}
        <div>
          <h2>教练提成统计</h2>
            <Table {...tableProps} />
        </div>
      </PageWrapper>
    );
  }
}

DataList.propTypes = {
  // match: PropTypes.object.isRequired,
  dataList: PropTypes.object.isRequired,
  // getCategoryListData: PropTypes.func.isRequired,
  // handleOpenEditModal: PropTypes.func.isRequired,
  // handleEditCategoryName: PropTypes.func.isRequired,
  // handleCancelEdit: PropTypes.func.isRequired,
  // handleOpenCreateModal: PropTypes.func.isRequired,
  // handleCancelCreate: PropTypes.func.isRequired,
  // handleCreateCategory: PropTypes.func.isRequired,
};

export default DataList; 
