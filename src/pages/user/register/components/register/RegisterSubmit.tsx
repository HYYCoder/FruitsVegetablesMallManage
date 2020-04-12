import { Button, Form } from 'antd';

import { ButtonProps } from 'antd/es/button';
import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const FormItem = Form.Item;

interface RegisterSubmitProps extends ButtonProps {
  className?: string;
}

const RegisterSubmit: React.FC<RegisterSubmitProps> = ({ className, ...rest }) => {
  const clsString = classNames(styles.submit, className);
  return (
    <FormItem>
      <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest} />
    </FormItem>
  );
};

export default RegisterSubmit;
