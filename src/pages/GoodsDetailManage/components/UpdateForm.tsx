import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal } from 'antd';
import { TableListItem } from '../data.d';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import React from 'react';

const FormItem = Form.Item;

interface UpdateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (
    id: number,
    fieldsValue: {
      imageUrls: string;
      type: string;
      name: string;
      price: number;
      stock: number;
      specification: string;
      reducedPrice: number;
      detail: string;
    },
  ) => void;
  onCancel: () => void;
  updateData: TableListItem;
}

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleUpdate, onCancel, updateData } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleUpdate(updateData.id, fieldsValue);
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
          initialValue: updateData?.imageUrls,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品类型">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！', min: 1 }],
          initialValue: updateData?.type,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品名">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！', min: 1 }],
          initialValue: updateData?.name,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="价格">
        {form.getFieldDecorator('price', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！' }],
          initialValue: updateData?.price,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="库存">
        {form.getFieldDecorator('stock', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！' }],
          initialValue: updateData?.stock,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="单位">
        {form.getFieldDecorator('specification', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！' }],
          initialValue: updateData?.specification,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="打折减价">
        {form.getFieldDecorator('reducedPrice', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！' }],
          initialValue: updateData?.reducedPrice,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('detail', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！', min: 1 }],
          initialValue: updateData?.detail,
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<UpdateFormProps>()(UpdateForm);
