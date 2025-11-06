import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import style from './style.scss';

class HomeCard extends React.PureComponent {
  clearNumber = num => {
    if (typeof num === 'number') {
      return num.toLocaleString();
    } else {
      return num;
    }
  }

  render() {
    const { title, num, linkTo } = this.props;

    const textStyle = {
      fontSize: 26,
      fontWeight: 'bold',
    };

    return (
      <Link to={linkTo}>
        <Card bordered={true} hoverable title={title} >
          <div>
            <p className={style.cardText}>{this.clearNumber(num)}</p>
          </div>
        </Card>
      </Link>
    );
  }
}

HomeCard.propTypes = {
  title: PropTypes.string.isRequired,
  num: PropTypes.number,
  linkTo: PropTypes.string.isRequired,
};

HomeCard.defaultProps = {
  num: 0
};

export default HomeCard;
