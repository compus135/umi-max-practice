import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import _ from 'lodash';
import { useRef, useState } from 'react';

type ToDo = {
  action: string;
  done: boolean;
};
const data = new Array(50).fill(0).map((item, index) => ({
  id: _.uniqueId(),
  action: 'action' + index,
  done: index % 2 === 0,
}));
/**
 *
 * request:
 * 1. params  变化会触发重新加载
 * 2. 前端分页：total等于记录数或不使用total（默认total等于data 长度）
 * 3. 服务端分页：total 总记录数，data 当前页数据
 * 4. request 方法执行时机：初始、params 变化（深度对比）、actionRef.current?.reload()
 */
const Demo = () => {
  const actionRef = useRef<ActionType>();

  const [count, setCount] = useState(0);
  const columns: ProColumns<ToDo>[] = [
    {
      title: 'id',
      dataIndex: 'id',
    },
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
    <div>
      <Button
        onClick={() => {
          setCount((pre) => pre + 1);
        }}
      >
        count++
      </Button>

      <Button onClick={() => actionRef.current?.reload()}>refresh</Button>

      <ProTable<ToDo>
        actionRef={actionRef}
        params={{ count }}
        request={async (params) => {
          console.log(params);
          // 前端分页
          return {
            success: false,
            data,
          };
        }}
        columns={columns}
        rowKey={'id'}
        pagination={{
          pageSize: 5,
        }}
      />
    </div>
  );
};

export default Demo;
