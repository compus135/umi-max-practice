import { ProTable } from '@ant-design/pro-components';

const dataSource = [
  {
    action: 'todo 1',
    done: true,
  },
];

const Demo = () => {
  return (
    <ProTable
      dataSource={dataSource}
      columns={[
        {
          title: 'action',
          dataIndex: 'action',
        },
        {
          title: 'done',
          dataIndex: 'done',
        },
      ]}
      rowKey={'action'}
      scroll={{ x: 'max-content' }}
    />
  );
};

export default Demo;
