import { DISCOUNT_METHOD_DICT, DiscountMethod } from '@/constants/product';
import { Form, Input, InputNumber, Radio } from 'antd';
import { useEffect } from 'react';
const { Item, useForm, useWatch } = Form;
const DependencyRenderAndValue = () => {
  const [form] = useForm();
  const productName = useWatch('productName', form);
  console.log('rerender');
  useEffect(() => {
    console.log('----productName');
    console.log(productName);
    form.setFieldValue('billingMethods', productName);
    if (productName === '123') {
      form.setFieldValue('discountMethod', DiscountMethod.Rate);
      form.setFieldValue('discountRate', 50);
    } else {
      form.setFieldValue('discountMethod', DiscountMethod.Amount);
      form.setFieldValue('discountRate', 100);
    }
  }, [form, productName]);
  return (
    <div>
      <Form form={form}>
        <Item label="产品名称" name={'productName'}>
          <Input />
        </Item>

        <Item label="产品项" name="billingMethods">
          <Input />
        </Item>
        <Item label="优惠方式" name={'discountMethod'}>
          <Radio.Group>
            {Object.entries(DISCOUNT_METHOD_DICT).map(([key, value]) => (
              <Radio key={key} value={parseInt(key)}>
                {value.label}
              </Radio>
            ))}
          </Radio.Group>
        </Item>
        <Item dependencies={['discountMethod']} noStyle>
          {() => {
            const discountMethod = form.getFieldValue('discountMethod');
            console.log('discountMethod', discountMethod);
            return (
              <>
                {discountMethod === DiscountMethod.Rate && (
                  <Item
                    name={'discountRate'}
                    label="优惠折扣率"
                    rules={[{ required: true }]}
                  >
                    <InputNumber style={{ width: '100%' }} />
                  </Item>
                )}
                {discountMethod === DiscountMethod.Amount && (
                  <Item
                    name={'discountPrice'}
                    label="优惠金额"
                    rules={[{ required: true }]}
                  >
                    <InputNumber style={{ width: '100%' }} />
                  </Item>
                )}
              </>
            );
          }}
        </Item>
      </Form>
    </div>
  );
};

export default DependencyRenderAndValue;

// form.setFieldValue  dependencies
