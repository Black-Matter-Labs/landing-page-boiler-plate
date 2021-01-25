import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';

import { getChildrenToRender } from './utils';

function Feature7(props) {
  const { dataSource, isMobile, ...tagProps } = props;
  const { blockWrapper, titleWrapper } = dataSource;
  const childrenToRender = blockWrapper.children.map((item, i) => (
    <Col {...item} key={i.toString()}>
      <div {...item.children} style={{ padding: 0 }}>
        {item.children.children.map(getChildrenToRender)}
      </div>
    </Col>
  ));
  return (
    <div {...tagProps} {...dataSource.wrapper}>
      <div {...dataSource.page}>
        <div {...dataSource.titleWrapper}>
          {titleWrapper.children.map(getChildrenToRender)}
        </div>
        <OverPack {...dataSource.OverPack}>
          <QueueAnim
            key="queue"
            type="bottom"
            leaveReverse
            interval={50}
            component={Row}
            {...blockWrapper}
          >
            {childrenToRender}
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
}

export default Feature7;
