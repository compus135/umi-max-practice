import { Form, Input } from 'antd';

const FormList = () => {
  return (
    <Form
      onFinish={(values) => {
        console.log(values);
      }}
    >
      <Form.List name="sshkeys" initialValue={[12]}>
        {(fields) => {
          return fields.map((field) => {
            console.log(field);
            return (
              <Form.Item name={0} isListField key={field.key}>
                <Input />
              </Form.Item>
            );
          });
        }}
      </Form.List>
    </Form>
  );
};

export default FormList;
