import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Col, Row, Statistic } from 'antd';
import type { FC } from 'react';

import { currentTimeRange } from 'utils';
import { Text } from 'components';

import styles from './style.module.scss';

const PageHeaderContent: FC<{ currentUser: any }> = ({ currentUser }) => {
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          {currentTimeRange()}，{currentUser.name}
          ，祝你开心每一天！
        </div>
        <div>
          {currentUser.title} |{currentUser.group}
        </div>
      </div>
    </div>
  );
};

const ExtraContent: FC<Record<string, any>> = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="项目数" value={56} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="团队内排名" value={8} suffix="/ 24" />
    </div>
    <div className={styles.statItem}>
      <Statistic title="项目访问" value={2223} />
    </div>
  </div>
);

const Workplace: FC = () => {
  return (
    <PageContainer
      // waterMarkProps={{ content: username }}
      // style={{ background: "#fff" }}
      content={
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <PageHeaderContent
            currentUser={{
              avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
              name: '吴彦祖',
              userid: '00000001',
              email: 'antdesign@alipay.com',
              signature: '海纳百川，有容乃大',
              title: '交互专家',
              group: '某某某事业群－某某平台部－某某技术部－UED',
            }}
          />
          <ExtraContent />
        </div>
      }
    >
      <Row gutter={24}>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Text>Hello word</Text>
        </Col>
      </Row>
    </PageContainer>
  );
};
export default Workplace;
