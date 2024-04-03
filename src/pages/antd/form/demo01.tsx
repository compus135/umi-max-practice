import { Form, Input } from 'antd';

const Demo = () => {
  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 12 }}
      style={{ width: 300, margin: '0 auto' }}
    >
      <Form.Item label="姓名">
        <Input style={{ width: 120 }} />
      </Form.Item>
    </Form>
  );
};

export default Demo;
