import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input, Select } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { FormComponentProps } from '@ant-design/compatible/es/form';
// import { formatMessage } from 'umi-plugin-react/locale';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
import { TableListItem, imageItem } from '../data';
// import UploadImageList from '../../../components/UploadImage/UploadImageList';

const FormItem = Form.Item;
const { Option } = Select;

export interface UpdateFormProps extends FormComponentProps {
  updateModalVisible: boolean;
  onSubmit: (
    id: number,
    fieldsValue: {
      orders: number;
      pid: number;
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
    form.setFieldsValue({
      id: 0,
    });
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleUpdate(updateData.id, fieldsValue);
    });
    // let newData = '';
    // const { dispatch } = props;
    // imageListData.map((item, index) => {
    //   if (item.file.size !== 0) {
    //     dispatch({
    //       type: 'image/upload',
    //       payload: item.file,
    //       callback: (response: any) => {
    //         newData += response;
    //         if (index + 1 === imageListData.length) {
    //           form.setFieldsValue({
    //             imageUrl: newData,
    //             id: 0,
    //           });
    //           form.validateFields((err, fieldsValue) => {
    //             if (err) return;
    //             form.resetFields();
    //             handleUpdate(updateData.userName, fieldsValue);
    //           });
    //         }
    //       },
    //     });
    //   } else {
    //     newData += item.url;
    //   }
    //   if (item.file.size === 0 && index + 1 === imageListData.length) {
    //     form.setFieldsValue({
    //       imageUrl: newData,
    //     });
    //     form.validateFields((err, fieldsValue) => {
    //       if (err) return;
    //       form.resetFields();
    //       handleUpdate(updateData.userName, fieldsValue);
    //     });
    //   }
    //   return null;
    // });
  };

  return (
    <Modal
    destroyOnClose
    title="修改轮播图"
    visible={updateModalVisible}
    onOk={okHandle}
    onCancel={() => {
      onCancel();
      setImageListData([{ url: '', file: new File([], '')}]);
    }}
    width={600}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="一级分类编号">
        {form.getFieldDecorator('pid', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！' }],
          initialValue: updateData?.pid,
        })(<Select showArrow={true} placeholder="请选择"> 
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
          </Select>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="优先级">
        {form.getFieldDecorator('orders', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！' }],
          initialValue: updateData?.orders,
        })(<Select showArrow={true} placeholder="请选择"> 
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
          </Select>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！' }],
          initialValue: updateData?.name,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="头像">
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
                    <Icon
                      key="plusType"
                      type="plus"
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
      </FormItem> */}
    </Modal>
  );
}

export default connect(() => ({}))(Form.create<UpdateFormProps>()(UpdateForm));