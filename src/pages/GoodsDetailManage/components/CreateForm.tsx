import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal } from 'antd';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import React from 'react';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {
    imageUrls: string;
    type: string;
    name: string;
    price: number;
    stock: number;
    specification: string;
    reducedPrice: number;
    detail: string;
  }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新建商品"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品图">
        {form.getFieldDecorator('imageUrls', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！', min: 1 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品类型">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！', min: 1 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品名">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！', min: 1 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="价格">
        {form.getFieldDecorator('price', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！', min: 1 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="库存">
        {form.getFieldDecorator('stock', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！', min: 1 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="单位">
        {form.getFieldDecorator('specification', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！', min: 1 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="打折减价">
        {form.getFieldDecorator('reducedPrice', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！', min: 1 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('detail', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！', min: 1 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
