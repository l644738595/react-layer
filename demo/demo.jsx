import React, { Component } from 'react';
import { ReactLayer } from '../src';

class Node extends Component {
  state = {
    show: false,
  }

  handleBtnClick = () => {
    this.setState({
      show: true,
    });
  }

  handleClose = () => {
    this.setState({
      show: false,
    });
  }

  render() {
    const { show } = this.state;
    return (
      <div>
        <button type="button" onClick={this.handleBtnClick}>展开</button>
        <ReactLayer show={show} skin="msg" time={2} onClose={this.handleClose}>hello layer</ReactLayer>
        <ReactLayer btn="我知道了" title="移动版和PC版不能同时存在同一页面" />
        <ReactLayer btn={['确定', '取消']} title="退出登录" />
      </div>
    );
  }
}

export default Node;
