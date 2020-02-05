import { Form, Icon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Upload, Modal, Col, Row } from 'antd';
import React from 'react';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { formatMessage } from 'umi-plugin-react/locale';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
import { TableListItem, imageItem } from '../data.d';
import UploadImageList from '../../../components/UploadImage/UploadImageList';

const FormItem = Form.Item;

export interface UpdateFormProps extends FormComponentProps {
  updateModalVisible: boolean;
  onSubmit: (
    id: number,
    fieldsValue: {
      imageUrl: string;
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
      if (item.file.size !== 0) {
        dispatch({
          type: 'goods/upload',
          payload: item.file,
          callback: (response: any) => {
            newData += response;
            form.setFieldsValue({
              imageUrls: newData,
            });
            form.validateFields((err, fieldsValue) => {
              if (err) return;
              form.resetFields();
              handleUpdate(updateData.id, fieldsValue);
            });
          },
        });
      }
      return null;
    });
  };

  return (
    <Modal
    destroyOnClose
    title="修改轮播图"
    visible={updateModalVisible}
    onOk={okHandle}
    onCancel={() => {
      onCancel();
      setImageListData([{ url: '', file: new File([], '') }]);
    }}
    width={600}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品图">
      {form.getFieldDecorator('imageUrls', {
        rules: [{ required: true, message: '请输入至少1个字符的规则描述！' }],
      })(
        <Row>
          {imageListData!==undefined?
            <Col span={12}>
              <UploadImageList
              item={imageListData[1]}
              itemDelete={() => {
                const newData = imageListData || [];
                newData.splice(0, 2);
                setImageListData(newData);
              }}/> 
            </Col>:
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
          }
        </Row>
      )}
    </FormItem>
    </Modal>
  );
}

export default connect(() => ({}))(Form.create<UpdateFormProps>()(UpdateForm));
