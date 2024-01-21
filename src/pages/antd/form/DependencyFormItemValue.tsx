import { Form, Input } from 'antd';
import { useEffect } from 'react';
const { Item, useForm, useWatch } = Form;
const DependencyFormItemValue = () => {
  const [form] = useForm();
  const productName = useWatch('productName', form);
  useEffect(() => {
    form.setFieldValue('billingMethods', productName);
  }, [form, productName]);
  return (
    <div>
      <Form initialValues={{ productName: 'name1' }} form={form}>
        <Item label="产品名称" name={'productName'}>
          <Input />
        </Item>

        <Item label="产品项" name="billingMethods">
          <Input />
        </Item>
      </Form>
    </div>
  );
};

export default DependencyFormItemValue;
