import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Upload, Modal, Col, Row, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { formatMessage } from 'umi-plugin-react/locale';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
import { TableListItem, imageItem } from '../data.d';
import UploadImageList from '../../../components/UploadImage/UploadImageList';

const FormItem = Form.Item;
const { Option } = Select;

export interface UpdateFormProps extends FormComponentProps {
  updateModalVisible: boolean;
  onSubmit: (
    userName: string,
    fieldsValue: {
      id: number;
      password: string;
      type: string;
      imageUrl: string;
      mobile: string;
      name: string;
    },
  ) => void;
  onCancel: () => void;
  updateData: TableListItem;
  imageListData: imageItem[];
  setImageListData: (data: imageItem[]) => void;
  dispatch: Dispatch<AnyAction>;
}

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const {
    updateModalVisible,
    form,
    onSubmit: handleUpdate,
    onCancel,
    updateData,
    imageListData,
    setImageListData,
  } = props;

  const okHandle = () => {
    let newData = '';
    const { dispatch } = props;
    imageListData.map((item, index) => {
      if(item.url === ''){
        return null;
      }
      if (item.file.size !== 0) {
        dispatch({
          type: 'image/upload',
          payload: item.file,
          callback: (response: any) => {
            newData += response;
            if (index + 1 === imageListData.length) {
              form.setFieldsValue({
                imageUrl: newData,
                id: 0,
              });
              form.validateFields((err, fieldsValue) => {
                if (err) return;
                form.resetFields();
                handleUpdate(updateData.userName, fieldsValue);
              });
            }
          },
        });
      } else {
        newData += item.url;
      }
      if (item.file.size === 0 && index + 1 === imageListData.length) {
        form.setFieldsValue({
          imageUrl: newData,
        });
        form.validateFields((err, fieldsValue) => {
          if (err) return;
          form.resetFields();
          handleUpdate(updateData.userName, fieldsValue);
        });
      }
      return null;
    });
  };

  return (
    <Modal
    destroyOnClose
    title="修改"
    visible={updateModalVisible}
    onOk={okHandle}
    onCancel={() => {
      onCancel();
      setImageListData([{ url: '', file: new File([], '')}]);
    }}
    width={600}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="头像">
      {form.getFieldDecorator('imageUrl', {
        rules: [{ required: true, message: '请输入至少1个字符的规则描述！' }],
      })(
        <Row>
          {imageListData?.map((item) => {
            if (item.url !== '') {
              return(
              <Col span={12}>
                <UploadImageList
                  item={item}
                  itemDelete={() => {
                    const newData = imageListData || [{ url: '', file: new File([], '') }];
                    newData.splice(0, 2);
                    setImageListData(newData);
                }}/> 
              </Col>
            )}
            return null;
          })}
          <Col span={12}>
            <Upload
              showUploadList={false}
              beforeUpload={(files: File) => {
                const imageList = [{ url: '', file: new File([], '') }];
                if (imageList[0] !== undefined && imageList[0].url === '') {
                  imageList.splice(0, 1);
                }
                imageList.push({ url: URL.createObjectURL(files), file: files });
                setImageListData(imageList);
                return false;
              }}
            >
              <Row
                style={{
                  border: '1px dashed #ccc',
                  width: '158px',
                  height: '143px',
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                }}
                align="middle"
              >
                <Col span={24}>
                  <Row justify="center" style={{ marginTop: 10 }}>
                    <PlusOutlined
                      style={{ fontSize: 37, color: 'rgba(0, 0, 0, 0.45)' }}
                    />
                  </Row>
                </Col>
                <Col span={24}>
                  <Row justify="center">
                    {formatMessage({ id: 'GoodsDetailManage.CreateForm.upload.image' })}
                  </Row>
                  <Row justify="center">
                    {formatMessage({ id: 'GoodsDetailManage.CreateForm.upload.tip' })}
                  </Row>
                </Col>
              </Row>
            </Upload>
          </Col>
        </Row>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {
          rules: [{ required: false, message: '请输入至少1个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！' }],
          initialValue: updateData?.type,
        })(<Select showArrow={true} placeholder="请选择"> 
            <Option value="admin">管理员</Option>
            <Option value="superadmin">超级管理员</Option>
          </Select>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！' }],
          initialValue: updateData?.name,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机号">
        {form.getFieldDecorator('mobile', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！' }],
          initialValue: updateData?.mobile,
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
}

export default connect(() => ({}))(Form.create<UpdateFormProps>()(UpdateForm));