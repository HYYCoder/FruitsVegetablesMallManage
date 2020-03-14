import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { FormComponentProps } from '@ant-design/compatible/es/form';
//import { formatMessage } from 'umi-plugin-react/locale';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
//import UploadImageList from '../../../components/UploadImage/UploadImageList';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {   
    name: string;
    mobile: string;
    address: string;
    userName: string;
    password: string;
    receivingPhone: string; }) => void;
  onCancel: () => void;
  dispatch: Dispatch<AnyAction>;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel } = props;
 // const [imageListData, setImageListData] = useState([{ url: '', file: new File([], '')}]);

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
    // let newData = '';
    // const { dispatch } = props;
    // imageListData.map((item, index) => {
    //   dispatch({
    //     type: 'image/upload',
    //     payload: item.file,
    //     callback: (response: any) => {
    //       newData += response;
    //       if (index + 1 === imageListData.length) {
    //         form.setFieldsValue({
    //           imageUrl: newData,
    //         });
    //         form.validateFields((err, fieldsValue) => {
    //           if (err) return;
    //           form.resetFields();
    //           handleAdd(fieldsValue);
    //         });
    //       }
    //     },
    //   });
    //   return null;
    // });
  };
  return (
    <Modal
      destroyOnClose
      title="新建用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
//        setImageListData([{ url: '', file: new File([], '')}]);
      }}
      width={600}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
        {form.getFieldDecorator('userName', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机号">
        {form.getFieldDecorator('mobile', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="地址">
        {form.getFieldDecorator('address', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="收货手机号">
        {form.getFieldDecorator('receivingPhone', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="轮播图">
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
      </FormItem> */}
    </Modal>
  );
};

export default connect(() => ({}))(Form.create<CreateFormProps>()(CreateForm));
