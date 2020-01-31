import { Form, Icon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, Upload, Row, Col, Popconfirm, message } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import React, { useState } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './form.less';
import { Dispatch, Action } from 'redux';
import { connect } from 'dva';

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
  dispatch: Dispatch<Action<'goods/upload'>>;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel } = props;
  const [imageListData, setImageListData] = useState([{ url: '', file: new File([], '') }]);

  const okHandle = () => {
    let newData = '';
    const { dispatch } = props;
    imageListData.map((item, index) => {
      dispatch({
        type: 'goods/upload',
        payload: item.file,
        callback: (response: any) => {
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

  // a little function to help us with reordering the result
  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const grid = 8;

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid,
    margin: `0 ${grid}px 0 0`,
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = () => ({
    display: 'flex',
    padding: grid,
    overflow: 'auto',
  });

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    let imageListDatas = [{ url: '', file: new File([], '') }];
    imageListDatas = reorder(imageListData, result.source.index, result.destination.index);
    setImageListData(imageListDatas);
  };

  return (
    <Modal
      destroyOnClose
      title="新建商品"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
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
                  {imageListData.map((item, index) => {
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
                                    const newData = imageListData || [];
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
                        // setfiles(file);
                        const imageList = imageListData || [];
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
                </div>
              )}
            </Droppable>
          </DragDropContext>,
        )}
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

function UploadImageList(props: any) {
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [visible, setVisible] = useState(false);

  function handleCancel() {
    setVisible(false);
  }

  function confirm() {
    props.itemDelete();
    message.success(
      `${formatMessage({ id: 'GoodsDetailManage.CreateForm.image.delete.success' })}`,
    );
  }

  function downLoad() {
    const tmpa = document.createElement('a');
    tmpa.download = 'image';
    tmpa.href = props.item.url;
    tmpa.click();
  }

  return (
    <div style={{ width: 158, height: 143, border: 'solid 1px #ececec' }}>
      <img
        src={props.item.url}
        style={{ width: 158, height: 143, objectFit: 'cover' }}
        onMouseEnter={() => setShowEditBtn(true)}
        alt=""
      />
      {showEditBtn ? (
        <div
          className={styles.imgOpacityBackground}
          onMouseEnter={() => setShowEditBtn(true)}
          onMouseLeave={() => setShowEditBtn(false)}
        >
          <Icon
            className={styles.imgLookBigPirture}
            theme="filled"
            type="eye"
            onClick={() => setVisible(true)}
          />
          <Popconfirm
            title={formatMessage({ id: 'GoodsDetailManage.CreateForm.image.download' })}
            onConfirm={downLoad}
            okText={formatMessage({ id: 'GoodsDetailManage.CreateForm.ok' })}
            cancelText={formatMessage({ id: 'GoodsDetailManage.CreateForm.cancel' })}
          >
            <Icon className={styles.imgDownloadPirture} type="download" />
          </Popconfirm>
          <Popconfirm
            title={formatMessage({ id: 'GoodsDetailManage.CreateForm.image.delete' })}
            onConfirm={confirm}
            okText={formatMessage({ id: 'GoodsDetailManage.CreateForm.ok' })}
            cancelText={formatMessage({ id: 'GoodsDetailManage.CreateForm.cancel' })}
          >
            <Icon className={styles.imgDeleteImage} theme="filled" type="delete" />
          </Popconfirm>
        </div>
      ) : null}
      <Modal
        width="550px"
        closable={false}
        visible={visible}
        footer={false}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={24}>
            <img className={styles.imgModalImage} src={props.item.url} alt="" />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default connect(() => ({}))(Form.create<CreateFormProps>()(CreateForm));
