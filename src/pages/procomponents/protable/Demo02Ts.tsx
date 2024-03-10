import { ProColumns, ProTable } from '@ant-design/pro-components';

type ToDo = {
  action: string;
  done: boolean;
};

const Demo = () => {
  const columns: ProColumns<ToDo>[] = [
    {
      title: 'action',
      dataIndex: 'action',
    },
    {
      title: 'done',
      dataIndex: 'done',
    },
  ];
  return (
    <ProTable<ToDo>
      request={async () => {
        return {
          success: true,
          data: [
            {
              action: 'todo 1',
              done: true,
            },
          ],
        };
      }}
      columns={columns}
    />
  );
};

export default Demo;
