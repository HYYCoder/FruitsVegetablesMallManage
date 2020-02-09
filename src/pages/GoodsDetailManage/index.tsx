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
import { queryGoods, updateGoods, addGoods, removeGoods } from './service';
import { Dispatch, AnyAction } from 'redux';

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<AnyAction>;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: {
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
}) => {
  const hide = message.loading('正在添加');
  try {
    await addGoods({
      imageUrls: fields.imageUrls,
      categoryId: fields.categoryId,
      name: fields.name,
      price: fields.price,
      stock: fields.stock,
      specification: fields.specification,
      reducedPrice: fields.reducedPrice,
      minimunOrderQuantity: fields.minimunOrderQuantity,
      maximumOrderQuantity: fields.maximumOrderQuantity,
      minimumIncrementQuantity: fields.minimumIncrementQuantity,
      detail: fields.detail,
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
  },
) => {
  const hide = message.loading('正在更新');
  try {
    await updateGoods({
      id: ids,
      imageUrls: fields.imageUrls,
      categoryId: fields.categoryId,
      name: fields.name,
      price: fields.price,
      stock: fields.stock,
      specification: fields.specification,
      reducedPrice: fields.reducedPrice,
      minimunOrderQuantity: fields.minimunOrderQuantity,
      maximumOrderQuantity: fields.maximumOrderQuantity,
      minimumIncrementQuantity: fields.minimumIncrementQuantity,
      detail: fields.detail,
    });
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
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
    await selectedRows.map(row => removeGoods(row.id));
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
      title: '商品类型',
      dataIndex: 'categoryId',
    },
    {
      title: '商品名',
      dataIndex: 'name',
      // renderText: (val: string) => `${val} 万`,
    },
    {
      title: '价格',
      dataIndex: 'price',
      sorter: true,
      // valueEnum: {
      //   0: { text: '关闭', status: 'Default' },
      //   1: { text: '运行中', status: 'Processing' },
      //   2: { text: '已上线', status: 'Success' },
      //   3: { text: '异常', status: 'Error' },
      // },
    },
    {
      title: '库存',
      dataIndex: 'stock',
      sorter: true,
      // valueType: 'dateTime',
    },
    {
      title: '打折减价',
      dataIndex: 'reducedPrice',
    },
    {
      title: '最少下单',
      dataIndex: 'minimunOrderQuantity',
    },
    {
      title: '最多下单',
      dataIndex: 'maximumOrderQuantity',
    },
    {
      title: '下单增量',
      dataIndex: 'minimumIncrementQuantity',
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
              record.imageUrls.split('&&').map(item => {
                if (newData[0].url === '') {
                  newData.splice(0, 1);
                }
                return newData.push({ url: item, file: new File([], '') });
              });
              handleImageListData(newData);
              handleUpdateData(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a>
            <Popconfirm
              title="是否确定要删除商品?"
              onConfirm={() => {
                removeGoods(record.id);
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
        headerTitle="商品列表"
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
            <span>总价 {selectedRows.reduce((pre, item) => pre + item.price, 0)} 元</span>
          </div>
        )}
        request={params => queryGoods(params)}
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
