import { Form, Input, Radio } from 'antd';
const { Item } = Form;
const DependencyRender = () => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      onFinish={(values) => {
        console.log(values);
      }}
    >
      <Item name={'mode'} initialValue={'pwd'}>
        <Radio.Group>
          <Radio value={'pwd'}>pwd</Radio>
          <Radio value={'ssh'}>ssh</Radio>
        </Radio.Group>
      </Item>
      <Item dependencies={['mode']}>
        {() => {
          const mode = form.getFieldValue('mode');
          return mode === 'pwd' ? (
            <Item name="pwd" label="pwd">
              <Input />
            </Item>
          ) : (
            <Item name="ssh" label="ssh">
              <Input />
            </Item>
          );
        }}
      </Item>
    </Form>
  );
};

export default DependencyRender;
