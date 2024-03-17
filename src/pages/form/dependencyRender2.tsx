import { Button, Form, Input } from 'antd';
const { Item } = Form;
export default () => {
  const [form] = Form.useForm();
  console.log('xxxxxxxxxxxxxxxx');
  return (
    <div>
      <Button
        onClick={() => {
          form.setFieldValue('name', 'ysw');
        }}
      >
        setFieldValue
      </Button>
      <Form form={form}>
        <Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input />
        </Item>
        <Item dependencies={['name']}>
          {() => {
            const name = form.getFieldValue('name');
            console.log('name xxx', name);
            return (
              <Item
                name="age2"
                label="年龄"
                rules={[{ required: true, message: '请输入年龄' }]}
              >
                <Input />
              </Item>
            );
          }}
        </Item>

        <Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => {
            console.log('prevValues', prevValues);
            console.log('currentValues', currentValues);
            return prevValues.name !== currentValues.name;
          }}
        >
          {() => {
            const name = form.getFieldValue('name');
            console.log('name', name);
            return (
              <Item
                name="age"
                label="年龄"
                rules={[{ required: true, message: '请输入年龄' }]}
              >
                <Input />
              </Item>
            );
          }}
        </Item>
      </Form>
    </div>
  );
};
