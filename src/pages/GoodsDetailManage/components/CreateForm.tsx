import { Form, Icon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, Row, Col, Upload } from 'antd';
import React, { useState } from 'react';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { formatMessage } from 'umi-plugin-react/locale';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
import UploadImageList from '../../../components/UploadImage/UploadImageList';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {
    imageUrls: string;
    categoryId: number;
    name: string;
    price: number;
    stock: number;
    specification: string;
    reducedPrice: number;
    minimunOrderQuantity: number;
    maximumOrderQuantity: number;
    minimumIncrementQuantity: number;
    detail: string;
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
          newData +="&&"
          newData += response;
          if (index + 1 === imageListData.length) {
            form.setFieldsValue({
              imageUrls: newData,
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

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const grid = 8;

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: 'none',
    padding: grid,
    margin: `0 ${grid}px 0 0`,
    background: isDragging ? 'lightgreen' : 'white',
    ...draggableStyle,
  });

  const getListStyle = () => ({
    display: 'flex',
    padding: grid,
    overflow: 'auto',
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    let imageListDatas = [{ url: '', file: new File([], '')}];
    imageListDatas = reorder(imageListData, result.source.index, result.destination.index);
    setImageListData(imageListDatas);
  };

  return (
    <Modal
      destroyOnClose
      title="新建商品"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
        setImageListData([{ url: '', file: new File([], '')}]);
      }}
      width={600}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品图">
        {form.getFieldDecorator('imageUrls', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！' }],
        })(
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided: any) => (
                <div ref={provided.innerRef} style={getListStyle()} {...provided.droppableProps}>
                  {imageListData?.map((item, index) => {
                    if (item.url !== '') {
                      return (
                        <Col span={13} key={item.url}>
                          <Draggable draggableId={item.url} index={index}>
                            {(provideds: any, snapshots: any) => (
                              <div
                                ref={provideds.innerRef}
                                {...provideds.draggableProps}
                                {...provideds.dragHandleProps}
                                style={getItemStyle(
                                  snapshots.isDragging,
                                  provideds.draggableProps.style,
                                )}
                              >
                                <UploadImageList
                                  item={item}
                                  itemDelete={() => {
                                    const newData = [{ url: '', file: new File([], '')}];
                                    imageListData.map(item => {
                                      if (newData[0].url === '') {
                                        newData.splice(0, 1);
                                      }
                                      return newData.push({ url: item.url, file: item.file });
                                    });
                                    newData.splice(index, 1);
                                    setImageListData(newData);
                                  }}
                                />
                              </div>
                            )}
                          </Draggable>
                        </Col>
                      );
                    }
                    return null;
                  })}
                  {provided.placeholder}
                  <Col span={8} style={{ padding: grid }}>
                    <Upload
                      showUploadList={false}
                      beforeUpload={(files: File) => {
                        const newData = [{ url: '', file: new File([], '')}];
                        imageListData.map(item => {
                          if (newData[0].url === '') {
                            newData.splice(0, 1);
                          }
                          return newData.push({ url: item.url, file: item.file });
                        });
                        newData.push({ url: URL.createObjectURL(files), file: files });
                        setImageListData(newData);
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
                </div>
              )}
            </Droppable>
          </DragDropContext>,
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品类型">
        {form.getFieldDecorator('categoryId', {
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
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="最少下单">
        {form.getFieldDecorator('minimunOrderQuantity', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！', min: 1 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="最多下单">
        {form.getFieldDecorator('maximumOrderQuantity', {
          rules: [{ required: true, message: '请输入至少1个字符的规则描述！', min: 1 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="下单增量">
        {form.getFieldDecorator('minimumIncrementQuantity', {
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

export default connect(() => ({}))(Form.create<CreateFormProps>()(CreateForm));
