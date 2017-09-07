import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.scss';

const ready = {
  timer: {},
  end: {},
};
let index = 0;

class Layer extends Component {
  static propTypes = {
    children: PropTypes.node,
    /**
     * 根元素的css类名称.
     */
    className: PropTypes.string,
    /**
     * 是否显示.
     */
    show: PropTypes.bool,
    /**
     * 设置弹层的类型.
     * 默认：0 （0表示信息框，1表示页面层, 2表示loading).
     */
    type: PropTypes.oneOf([0, 1, 2]),
    /**
     * 动画类型.
     * 默认：scale.
     */
    anim: PropTypes.oneOf(['scale', 'up']),
    title: PropTypes.string,
    /**
     * 控制自动关闭层所需秒数.
     */
    time: PropTypes.number,
    /**
     * 设定弹层显示风格.
     * 目前支持配置 footer（即底部对话框风格）、msg（普通提示） 两种风格.
     */
    skin: PropTypes.oneOf(['footer', 'msg']),
    /**
     * 按钮.
     * 不设置则不显示按钮。如果只需要一个按钮，则btn: '按钮'，如果有两个，则：btn: ['按钮一', '按钮二'].
     */
    btn: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    /**
     * 控制遮罩展现.
     * 默认：true，该参数可允许你是否显示遮罩.
     */
    shade: PropTypes.bool,
    /**
     * 是否点击遮罩时关闭层.
     * 默认：true.
     */
    shadeClose: PropTypes.bool,
    /**
     * 点确定按钮触发的回调函数，返回一个参数为当前层的索引.
     */
    yes: PropTypes.func,
    /**
     * 点取消按钮触发的回调函数.
     */
    no: PropTypes.func,
    /**
     * 触发关闭时的回调函数.
     */
    onClose: PropTypes.func,
    contentType: PropTypes.oneOf(['default', 'primary']),
  };

  static defaultProps = {
    children: null,
    className: 'layer',
    show: false,
    type: 0,
    anim: 'scale',
    title: null,
    time: 0,
    skin: 'msg',
    btn: [],
    shade: true,
    shadeClose: true,
    yes: null,
    no: null,
    onClose: null,
    contentType: 'default',
  };

  state = {
    isShow: false,
    index: index++,
  };

  componentDidMount() {
    if (this.props.show) {
      this.enter();
      this.autoClose(this.props.time);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.show && nextProps.show) {
      this.enter();
      this.autoClose(nextProps.time);
    } else if (this.props.show && !nextProps.show) {
      this.leave();
    }
  }

  enter() {
    this.setState({
      isShow: true,
    });
  }

  leave() {
    this.setState({
      isShow: false,
    });
  }

  autoClose = (time) => {
    if (time) {
      ready.timer[this.state.index] = setTimeout(() => {
        this.handleClose();
      }, time * 1000);
    }
  }

  handleClose = () => {
    clearTimeout(ready.timer[this.state.index]);
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  handleShadeTouchTap = () => {
    if (this.props.shadeClose) {
      this.handleClose();
    }
  }

  handleBtnTouchTap = (event, type) => {
    if (type === 0) {
      if (this.props.no) {
        this.props.no();
      }
      this.handleClose();
    } else if (this.props.yes) {
      this.props.yes();
    } else {
      this.handleClose();
    }
  }

  render() {
    const {
      children,
      className,
      show,
      title,
      btn,
      type,
      skin,
      contentType,
    } = this.props;
    let {
      anim,
      shade,
    } = this.props;

    let titleElement;
    let btnArr;
    let buttonElement;
    let headerElement;
    let contentElement;
    let footerElement;

    if (title) {
      titleElement = (
        <h3>{title}</h3>
      );
    }

    if (typeof btn === 'string') {
      btnArr = [btn];
    } else {
      btnArr = btn || [];
    }

    if (btn || btnArr.length) {
      if (btnArr.length === 2) {
        buttonElement = (
          <div className="layerbtn">
            <div>
              <button
                onClick={(event) => { this.handleBtnTouchTap(event, 0); }}
              >
                {btnArr[1]}
              </button>
            </div>
            <div>
              <button
                onClick={(event) => { this.handleBtnTouchTap(event, 1); }}
              >
                {btnArr[0]}
              </button>
            </div>
          </div>
        );
      } else {
        buttonElement = (
          <div className="layerbtn">
            <div>
              <button
                onClick={(event) => { this.handleBtnTouchTap(event, 1); }}
              >
                {btnArr[0]}
              </button>
            </div>
          </div>
        );
      }
    }

    if (skin) anim = 'up';
    if (skin === 'msg') shade = false;

    if (title) {
      headerElement = <div className="layerheader">{titleElement}</div>;
    }

    if (buttonElement) {
      footerElement = <div className="layerfooter">{buttonElement}</div>;
    }

    const contentCls = classnames({
      layercontent: true,
      [contentType]: true,
    });

    if (type === 2) {
      contentElement = <div className={contentCls}><i /><i className="layerload" /><i /><p>{children}</p></div>;
    } else {
      contentElement = <div className={contentCls}>{children}</div>;
    }

    const klassnames = classnames({
      [className]: true,
      [`${className}-${type}`]: true,
      show,
    });

    const mainCls = classnames({
      layermain: true,
      [skin]: !!skin,
    });

    const sectionCls = classnames({
      layersection: true,
      [anim]: !!anim,
    });

    return (
      <div
        className={klassnames}
      >
        { shade && <div className="layershade" onClick={this.handleShadeTouchTap} /> }
        <div className={mainCls}>
          <div className={sectionCls}>
            {headerElement}
            {contentElement}
            {footerElement}
          </div>
        </div>
      </div>
    );
  }
}

export default Layer;
