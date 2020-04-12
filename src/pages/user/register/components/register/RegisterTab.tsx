import React, { useEffect } from 'react';
import { TabPaneProps } from 'antd/es/tabs';
import { Tabs } from 'antd';
import RegisterContext, { RegisterContextProps } from './RegisterContext';

const { TabPane } = Tabs;

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

interface RegisterTabProps extends TabPaneProps {
  tabUtil: RegisterContextProps['tabUtil'];
}

const RegisterTab: React.FC<RegisterTabProps> = props => {
  useEffect(() => {
    const uniqueId = generateId('register-tab-');
    const { tabUtil } = props;
    if (tabUtil) {
      tabUtil.addTab(uniqueId);
    }
  }, []);

  const { children } = props;
  return <TabPane {...props}>{children}</TabPane>;
};

const WrapContext: React.FC<TabPaneProps> & {
  typeName: string;
} = props => (
  <RegisterContext.Consumer>
    {value => <RegisterTab tabUtil={value.tabUtil} {...props} />}
  </RegisterContext.Consumer>
);

// 标志位 用来判断是不是自定义组件
WrapContext.typeName = 'RegisterTab';

export default WrapContext;
