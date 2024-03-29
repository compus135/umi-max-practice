import { Card } from 'antd';

const Comp = () => {
  console.log('comp');
  return <div>Comp</div>;
};

const Demo = () => {
  return (
    <Card
      title="Card title"
      extra={<a href="#">More</a>}
      tabList={[
        { tab: 'Tab 1', key: '1', children: <Comp /> },
        { tab: 'Tab 2', key: '2', children: <Comp /> },
      ]}
    />
  );
};

export default Demo;
