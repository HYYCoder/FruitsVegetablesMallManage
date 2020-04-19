import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Divider, Dropdown, Menu, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { TableListItem } from './data';
import { querySubCategory, updateSubCategory, addSubCategory, removeSubCategory } from './service';
import { Dispatch, AnyAction } from 'redux';

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<AnyAction>;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: {
  orders: number;
  pid: number;
  name: string;
}) => {
  const hide = message.loading('正在添加');
  try {
    await addSubCategory({
      orders: fields.orders,
      pid: fields.pid,
      name: fields.name,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (
  id: number,
  fields: {
    orders: number;
    pid: number;
    name: string;
}) => {
  const hide = message.loading('正在修改');
  try {
    await updateSubCategory({
      id: id,
      orders: fields.orders,
      pid: fields.pid,
      name: fields.name,
    });
    hide();

    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await selectedRows.map(row => removeSubCategory(row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<TableListProps> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [updateData, handleUpdateData] = useState();
  const [imageListData, handleImageListData] = useState();
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '一级分类编号',
      dataIndex: 'pid',
    },
    {
      title: '优先级',
      dataIndex: 'orders',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              const newData = [{ url: '', file: new File([], '') }];
              //newData.push({ url: record.imageUrl, file: new File([], '') });
              handleImageListData(newData);
              handleUpdateData(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a>
            <Popconfirm
              title="是否确定要删除用户?"
              onConfirm={() => {
                removeSubCategory(record.id);
                window.location.reload();
              }}
              okText="确认"
              cancelText="取消"
            >
              删除
            </Popconfirm>
          </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
          </div>
        )}
        request={params => querySubCategory(params)}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      <UpdateForm
        onSubmit={async (id, value) => {
          const success = await handleUpdate(id, value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
        }}
        updateModalVisible={updateModalVisible}
        updateData={updateData}
        imageListData={imageListData}
        setImageListData={data => {
          handleImageListData(data);
        }}
      />
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
