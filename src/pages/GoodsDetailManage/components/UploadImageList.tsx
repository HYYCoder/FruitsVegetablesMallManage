import React, { useState } from 'react';
import styles from './UploadImageList.less';
import { Modal, Row, Col, Popconfirm, message } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { Icon } from '@ant-design/compatible';

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
      {props.item.file.size !== 0?
        <img
          style={{ width: 158, height: 143, objectFit: 'cover' }}
          src={props.item.url}
          alt=""
        />:
        <img
          style={{ width: 158, height: 143, objectFit: 'cover' }}
          src={require('D:/Scripts/Project/MyProject/FruitsVegetablesMallServer/target/classes/static/images/goods/'+props.item.url)}
          alt=""
        />
      }
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
            {props.item.file.size !== 0? 
              <img
                className={styles.imgModalImage}
                src={props.item.url}
                alt=""
              />:
              <img
                className={styles.imgModalImage}
                src={require('D:/Scripts/Project/MyProject/FruitsVegetablesMallServer/target/classes/static/images/goods/'+props.item.url)}
                alt=""
              />
            }
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default UploadImageList;
