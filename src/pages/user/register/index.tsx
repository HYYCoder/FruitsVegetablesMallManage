import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import React, { useState } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { Link } from 'umi';
import { connect } from 'dva';
import { StateTypes } from '@/models/register';
import styles from './style.less';
import { RegisterParamsType } from '@/services/register';
import { ConnectState } from '@/models/connect';
import RegisterFrom from './components/register';

const { Tab, UserName, Password, ImageUrl, Mobile, Name ,Captcha, Submit } = RegisterFrom;
interface RegisterProps {
  dispatch: Dispatch<AnyAction>;
  userRegister: StateTypes;
  submitting?: boolean;
}

const RegisterMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Register: React.FC<RegisterProps> = props => {
  const { userRegister = {}, submitting } = props;
  const { status, type: registerType } = userRegister;
  const [type, setType] = useState<string>('account');

  const handleSubmit = (values: RegisterParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'register/register',
      payload: { ...values },
    });
  };
  return (
    <div className={styles.main}>
      <RegisterFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码注册">
          {status === 'error' && registerType === 'account' && !submitting && (
            <RegisterMessage content="账户或密码错误（admin/ant.design）" />
          )}

          <UserName
            name="userName"
            placeholder="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <ImageUrl
            name="imageUrl"
            placeholder="头像"
          />
          <Mobile
            name="mobile"
            placeholder="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
            ]}
          />
          <Name
            name="name"
            placeholder="姓名"
            rules={[
              {
                required: true,
                message: '请输入姓名！',
              },
            ]}
          />
        </Tab>
        <Tab key="mobile" tab="手机号注册">
          {status === 'error' && registerType === 'mobile' && !submitting && (
            <RegisterMessage content="验证码错误" />
          )}
          <ImageUrl
            name="imageUrl"
            placeholder="头像"
          />
          <Name
            name="name"
            placeholder="姓名"
            rules={[
              {
                required: true,
                message: '请输入姓名！',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <Mobile
            name="mobile"
            placeholder="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="验证码"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
          />
        </Tab>
        <Submit loading={submitting}>注册</Submit>
        <div className={styles.other}>
          其他注册方式
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
          <Link className={styles.register} to="/user/login">
            已有账号？返回登录
          </Link>
        </div>
      </RegisterFrom>
    </div>
  );
};

export default connect(({ register, loading }: ConnectState) => ({
  userRegister: register,
  submitting: loading.effects['register/register'],
}))(Register);
