import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, Col, Row, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { formatMessage } from 'umi-plugin-react/locale';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
import UploadImageList from '../../../components/UploadImage/UploadImageList';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { 
    orders: number;
    imageUrl: string; 
    name: string;
  }) => void;
  onCancel: () => void;
  dispatch: Dispatch<AnyAction>;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel } = props;
  const [imageListData, setImageListData] = useState([{ url: '', file: new File([], '')}]);

  const okHandle = () => {
    let newData = '';
    const { dispatch } = props;
    imageListData.map((item, index) => {
      dispatch({
        type: 'image/upload',
        payload: item.file,
        callback: (response: any) => {
          newData += response;
          if (index + 1 === imageListData.length) {
            form.setFieldsValue({
              imageUrl: newData,
            });
            form.validateFields((err, fieldsValue) => {
              if (err) return;
              form.resetFields();
              handleAdd(fieldsValue);
            });
          }
        },
      });
      return null;
    });
  };

  return (
    <Modal
      destroyOnClose
      title="新建轮播图"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
        setImageListData([{ url: '', file: new File([], '')}]);
      }}
      width={600}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="轮播图">
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
                      newData.splice(0, 1);
                      setImageListData(newData);
                    }}
                  />
                </Col>
              )}
            return null;
            })
          }
          <Col span={12}>
            <Upload
              showUploadList={false}
              beforeUpload={(files: File) => {
                const imageList = [{ url: '', file: new File([], '')}];
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
        </Row>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="排序">
        {form.getFieldDecorator('orders', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
};

export default connect(() => ({}))(Form.create<CreateFormProps>()(CreateForm));
