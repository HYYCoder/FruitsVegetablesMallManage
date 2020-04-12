import { Tabs, Form } from 'antd';
import React, { useState } from 'react';
import useMergeValue from 'use-merge-value';
import classNames from 'classnames';
import { FormInstance } from 'antd/es/form';
import RegisterContext from './RegisterContext';
import RegisterItem, { RegisterItemProps } from './RegisterItem';

import RegisterSubmit from './RegisterSubmit';
import RegisterTab from './RegisterTab';
import styles from './index.less';
import { RegisterParamsType } from '@/services/register';

export interface RegisterProps {
  activeKey?: string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  onSubmit?: (values: RegisterParamsType) => void;
  className?: string;
  from?: FormInstance;
  children: React.ReactElement<typeof RegisterTab>[];
}

interface RegisterType extends React.FC<RegisterProps> {
  Tab: typeof RegisterTab;
  Submit: typeof RegisterSubmit;
  UserName: React.FunctionComponent<RegisterItemProps>;
  Password: React.FunctionComponent<RegisterItemProps>;
  ImageUrl: React.FunctionComponent<RegisterItemProps>;
  Mobile: React.FunctionComponent<RegisterItemProps>;
  Name: React.FunctionComponent<RegisterItemProps>;
  Captcha: React.FunctionComponent<RegisterItemProps>;

}

const Register: RegisterType = props => {
  const { className } = props;
  const [tabs, setTabs] = useState<string[]>([]);
  const [active, setActive] = useState();
  const [type, setType] = useMergeValue('', {
    value: props.activeKey,
    onChange: props.onTabChange,
  });
  const TabChildren: React.ReactComponentElement<typeof RegisterTab>[] = [];
  const otherChildren: React.ReactElement<unknown>[] = [];
  React.Children.forEach(
    props.children,
    (child: React.ReactComponentElement<typeof RegisterTab> | React.ReactElement<unknown>) => {
      if (!child) {
        return;
      }
      if ((child.type as { typeName: string }).typeName === 'RegisterTab') {
        TabChildren.push(child as React.ReactComponentElement<typeof RegisterTab>);
      } else {
        otherChildren.push(child);
      }
    },
  );
  return (
    <RegisterContext.Provider
      value={{
        tabUtil: {
          addTab: id => {
            setTabs([...tabs, id]);
          },
          removeTab: id => {
            setTabs(tabs.filter(currentId => currentId !== id));
          },
        },
        updateActive: activeItem => {
          if (active[type]) {
            active[type].push(activeItem);
          } else {
            active[type] = [activeItem];
          }
          setActive(active);
        },
      }}
    >
      <div className={classNames(className, styles.login)}>
        <Form
          form={props.from}
          onFinish={values => {
            if (props.onSubmit) {
              props.onSubmit(values as RegisterParamsType);
            }
          }}
        >
          {tabs.length ? (
            <React.Fragment>
              <Tabs
                animated={false}
                className={styles.tabs}
                activeKey={type}
                onChange={activeKey => {
                  setType(activeKey);
                }}
              >
                {TabChildren}
              </Tabs>
              {otherChildren}
            </React.Fragment>
          ) : (
            props.children
          )}
        </Form>
      </div>
    </RegisterContext.Provider>
  );
};

Register.Tab = RegisterTab;
Register.Submit = RegisterSubmit;

Register.UserName = RegisterItem.UserName;
Register.Password = RegisterItem.Password;
Register.ImageUrl = RegisterItem.ImageUrl;
Register.Mobile = RegisterItem.Mobile;
Register.Name = RegisterItem.Name;
Register.Captcha = RegisterItem.Captcha;

export default Register;
