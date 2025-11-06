import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { productRoute, userRoute, categoryRoute, orderRoute } from 'util/route';

const SubMenu = Menu.SubMenu;

class SiderMenu extends React.PureComponent {
  state = {
    openKey: '/',
    selectedKey: '/',
  }

  componentDidMount() {
    const { pathname } = this.props.location;
    this.setOpenKeyAndSelectedKey(pathname);
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    const { pathname: prevPathname } = prevProps.location;

    if (pathname !== prevPathname) {
      this.setOpenKeyAndSelectedKey(pathname);
    }
  }

  setOpenKeyAndSelectedKey = (pathname) => {
    const urlList = this.urlToList(pathname);
    this.setState({
      openKey: urlList[0] || '/',
      selectedKey: urlList[1] || '/'
    });
  }

  /**
   * /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
   * @param {string} pathname 
   */
  urlToList(pathname) {
    const urlList = pathname.split('/').filter(i => i);
    return urlList.map((urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`);
  }

  handleMenuClick(item, key, keyPath) {

  }

  handleOpenChange = (openKeys) => {
    const newSelectedKey = openKeys[1];
    this.setState({ 
      openKey: newSelectedKey
    });
  }

  render() {
    const { openKey, selectedKey } = this.state;
    
    return (
      <Menu
        theme='dark'
        openKeys={[openKey]}
        selectedKeys={[selectedKey]}
        mode='inline'
        onClick={this.handleMenuClick}
        onOpenChange={this.handleOpenChange}
      >
        {/* <SubMenu
          key="/"
          title={<span><Icon type="user" /><span>首页</span></span>}
        > */}
          <Menu.Item key="/">
            <Link to="/"><Icon type="pie-chart" />首页</Link>
          </Menu.Item>
        {/* </SubMenu> */}

        {/* <SubMenu
          key='/product'
          title={<span><Icon type="user" /><span>商品</span></span>}
        > */}
        <Menu.Item key={productRoute.list}>
          <Link to={productRoute.list}><Icon type="pie-chart" />课程安排</Link>
        </Menu.Item>
        {/* </SubMenu> */}
{/* 
        <SubMenu
          key='/category'
          title={<span><Icon type="user" /><span>品类</span></span>}
        > */}
          <Menu.Item key={categoryRoute.list}>
            <Link to={categoryRoute.list}><Icon type="user" />场地管理</Link>
          </Menu.Item>
        {/* </SubMenu> */}
        <Menu.Item key='/coach/list'>
          <Link to='/coach/list'><Icon type="pie-chart" />教练管理</Link>
        </Menu.Item>
        <Menu.Item key='/member/list'>
          <Link to='/member/list'><Icon type="pie-chart" />会员管理</Link>
        </Menu.Item>
        <Menu.Item key='/data/list'>
          <Link to='/data/list'><Icon type="pie-chart" />数据统计</Link>
        </Menu.Item>
        {/* <SubMenu
          key='/order'
          title={<span><Icon type="pie-chart" /><span>订单</span></span>}
        > */}
        {/* <Menu.Item key={orderRoute.list}>
          <Link to={orderRoute.list}><Icon type="pie-chart" />教练管理</Link>
        </Menu.Item> */}
        {/* </SubMenu> */}

        <SubMenu
          key='/user'
          title={<span><Icon type="team" /><span>用户</span></span>}
        >
          <Menu.Item key={userRoute.list}>
            <Link to={userRoute.list}><Icon type="pie-chart" />用户管理</Link>
          </Menu.Item>
        </SubMenu>

      </Menu>
    );
  }
}

SiderMenu.propTypes = {
  location: PropTypes.object,
};

export default SiderMenu;
