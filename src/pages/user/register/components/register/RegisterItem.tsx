import { Button, Col, Input, Row, Form, message } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';

import omit from 'omit.js';
import { FormItemProps } from 'antd/es/form/FormItem';
import ItemMap from './map';
import RegisterContext, { RegisterContextProps } from './RegisterContext';
import styles from './index.less';
import { getFakeCaptcha } from '@/services/login';

export type WrappedRegisterItemProps = RegisterItemProps;
export type RegisterItemKeyType = keyof typeof ItemMap;
export interface RegisterItemType {
  UserName: React.FC<WrappedRegisterItemProps>;
  Password: React.FC<WrappedRegisterItemProps>;
  Mobile: React.FC<WrappedRegisterItemProps>;
  Captcha: React.FC<WrappedRegisterItemProps>;
}

export interface RegisterItemProps extends Partial<FormItemProps> {
  name?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  buttonText?: React.ReactNode;
  countDown?: number;
  getCaptchaButtonText?: string;
  getCaptchaSecondText?: string;
  updateActive?: RegisterContextProps['updateActive'];
  type?: string;
  defaultValue?: string;
  customProps?: { [key: string]: unknown };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tabUtil?: RegisterContextProps['tabUtil'];
}

const FormItem = Form.Item;

const getFormItemOptions = ({
  onChange,
  defaultValue,
  customProps = {},
  rules,
}: RegisterItemProps) => {
  const options: {
    rules?: RegisterItemProps['rules'];
    onChange?: RegisterItemProps['onChange'];
    initialValue?: RegisterItemProps['defaultValue'];
  } = {
    rules: rules || (customProps.rules as RegisterItemProps['rules']),
  };
  if (onChange) {
    options.onChange = onChange;
  }
  if (defaultValue) {
    options.initialValue = defaultValue;
  }
  return options;
};

const RegisterItem: React.FC<RegisterItemProps> = props => {
  const [count, setCount] = useState<number>(props.countDown || 0);
  const [timing, setTiming] = useState(false);
  // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
  const {
    onChange,
    customProps,
    defaultValue,
    rules,
    name,
    getCaptchaButtonText,
    getCaptchaSecondText,
    updateActive,
    type,
    tabUtil,
    ...restProps
  } = props;

  const onGetCaptcha = useCallback(async (mobile: string) => {
    const result = await getFakeCaptcha(mobile);
    if (result === false) {
      return;
    }
    message.success('获取验证码成功！验证码为：1234');
    setTiming(true);
  }, []);

  useEffect(() => {
    let interval: number = 0;
    const { countDown } = props;
    if (timing) {
      interval = window.setInterval(() => {
        setCount(preSecond => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval);
            // 重置秒数
            return countDown || 60;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);
  if (!name) {
    return null;
  }
  // get getFieldDecorator props
  const options = getFormItemOptions(props);
  const otherProps = restProps || {};

  if (type === 'Captcha') {
    const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);

    return (
      <FormItem shouldUpdate>
        {({ getFieldValue }) => (
          <Row gutter={8}>
            <Col span={16}>
              <FormItem name={name} {...options}>
                <Input {...customProps} {...inputProps} />
              </FormItem>
            </Col>
            <Col span={8}>
              <Button
                disabled={timing}
                className={styles.getCaptcha}
                size="large"
                onClick={() => {
                  const value = getFieldValue('mobile');
                  onGetCaptcha(value);
                }}
              >
                {timing ? `${count} 秒` : '获取验证码'}
              </Button>
            </Col>
          </Row>
        )}
      </FormItem>
    );
  }
  return (
    <FormItem name={name} {...options}>
      <Input {...customProps} {...otherProps} />
    </FormItem>
  );
};

const RegisterItems: Partial<RegisterItemType> = {};

Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  RegisterItems[key] = (props: RegisterItemProps) => (
    <RegisterContext.Consumer>
      {context => (
        <RegisterItem
          customProps={item.props}
          rules={item.rules}
          {...props}
          type={key}
          {...context}
          updateActive={context.updateActive}
        />
      )}
    </RegisterContext.Consumer>
  );
});

export default RegisterItems as RegisterItemType;
