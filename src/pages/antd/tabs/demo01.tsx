import { Tabs } from 'antd';

const Comp = () => {
  console.log('comp');
  return <div>Comp</div>;
};

const Demo = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        { key: '1', label: 'Tab 1', children: <Comp /> },
        { key: '2', label: 'Tab 2', children: <Comp /> },
      ]}
    />
  );
};

export default Demo;
