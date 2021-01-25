import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { getChildrenToRender } from './utils';
import { Form, Input, Button, Modal, Checkbox } from 'antd';
import EmailForm from './EmailForm';

class Banner5 extends React.Component {

  state = {
    input: ''
  }

  onChangeHandler = ({ target: { value } }) => this.setState({ input: value });

  submitHandler = () => {
    console.log(this.state.input);
    this.setState({ input: '' });
  }

  render() {
    const { ...tagProps } = this.props;
    const { dataSource } = tagProps;
    delete tagProps.dataSource;
    delete tagProps.isMobile;
    const animType = {
      queue: 'bottom',
      one: {
        y: '+=30',
        opacity: 0,
        type: 'from',
        ease: 'easeOutQuad',
      },
    };
    return (
      <div {...tagProps} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <img src="/logo.png" alt="Weedibles" style={{ margin: '30px auto 0px', width: '250px' }} />
          <QueueAnim
            key="text"
            type={animType.queue}
            leaveReverse
            ease={['easeOutQuad', 'easeInQuad']}
            {...dataSource.childWrapper}
            componentProps={{
              md: dataSource.childWrapper.md,
              xs: dataSource.childWrapper.xs,
            }}
          >
            <div name="title" className="banner5-title kjhkq1bs2h-editor_css">
              <span>
                <span>
                  <span>
                    <span>
                      <span>
                        <span>
                          <p>Making delicious edibles has never been easier</p>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div name="explain" className="banner5-explain kjhmqpqefvr-editor_css">
              <span>
                <span>
                  <span>
                    <p>
                      <span>
                        Are you tired of buying bad edibles? Browse over 10,000
                        recipes and learn to make edibles from quality recipes
                      </span>
                      <br />
                    </p>
                  </span>
                </span>
              </span>
            </div>
            <EmailForm />
          </QueueAnim>
          <TweenOne animation={animType.one} key="title" {...dataSource.image}>
            <img src={dataSource.image.children} width="100%" alt="img" />
          </TweenOne>
        </div>
      </div>
    );
  }
}
export default Banner5;
