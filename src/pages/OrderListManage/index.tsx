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
import { TableListItem } from './data.d';
import { queryOrder, updateOrder, addOrder, removeOrder } from './service';
import { Dispatch, AnyAction } from 'redux';

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<AnyAction>;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: {
  code: string;
  date: string;
  details: string;
  amount: string;
  discountAmount: number;
  paidAmount: number;
  receiver: number;
  address: string;
  mobile: string;
  note: string;
  userId: number;
  status: string;
}) => {
  const hide = message.loading('正在添加');
  try {
    await addOrder({
      code: fields.code,
      date: fields.date,
      details: fields.details,
      amount: fields.amount,
      discountAmount: fields.discountAmount,
      paidAmount: fields.paidAmount,
      receiver: fields.receiver,
      address: fields.address,
      mobile: fields.mobile,
      note: fields.note,
      userId: fields.userId,
      status: fields.status,
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
  ids: number,
  fields: {
    code: string;
    date: string;
    details: string;
    amount: string;
    discountAmount: number;
    paidAmount: number;
    receiver: number;
    address: string;
    mobile: string;
    note: string;
    userId: number;
    status: string;
}) => {
  const hide = message.loading('正在修改');
  try {
    await updateOrder({
      id: ids,
      code: fields.code,
      date: fields.date,
      details: fields.details,
      amount: fields.amount,
      discountAmount: fields.discountAmount,
      paidAmount: fields.paidAmount,
      receiver: fields.receiver,
      address: fields.address,
      mobile: fields.mobile,
      note: fields.note,
      userId: fields.userId,
      status: fields.status,
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
    await selectedRows.map(row => removeOrder(row.id));
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
      title: '订单编号',
      dataIndex: 'code',
    },
    {
      title: '时间',
      dataIndex: 'date',
    },
    {
      title: '商品编号',
      dataIndex: 'details',
    },
    {
      title: '原价',
      dataIndex: 'amount',
    },
    {
      title: '折扣',
      dataIndex: 'discountAmount',
    },
    {
      title: '总价',
      dataIndex: 'paidAmount',
    },
    {
      title: '收货手机',
      dataIndex: 'receiver',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '备注',
      dataIndex: 'note',
    },
    {
      title: '用户编号',
      dataIndex: 'userId',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      dataIndex: 'id',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              const newData = [{ url: '', file: new File([], '') }];
              // record.imageUrls.split('&&').map(item => {
              //   if (newData[0].url === '') {
              //     newData.splice(0, 1);
              //   }
              //   return newData.push({ url: item, file: new File([], '') });
              // });
              handleImageListData(newData);
              handleUpdateData(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a>
            <Popconfirm
              title="是否确定要删除订单?"
              onConfirm={() => {
                removeOrder(record.id);
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
        headerTitle="订单列表"
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
        request={params => queryOrder(params)}
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
