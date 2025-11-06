import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

import PageWrapper from 'component/page-wrapper';
import * as echarts from 'echarts';

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
  componentDidMount() {
    document.title = '会员管理';
    this.myChart = echarts.init(document.getElementById('testMaini'));
    debugger
    const option = {
    title: {
      text: 'Stacked Line'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
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
      type: 'value'
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
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


  getColumn = () => {

  }

  getList = () => {
    const { getCategoryListData, searchParams } = this.props;
    

    getCategoryListData(searchParams);
  }



  render() {
    const {
      
    } = this.props.dataList;

    
    return (
      <PageWrapper>
       
      <div id='testMaini' style={{ width: '100%', height: '300px'}}></div>
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
