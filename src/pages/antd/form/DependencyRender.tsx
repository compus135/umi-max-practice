import { DISCOUNT_METHOD_DICT, DiscountMethod } from '@/constants/product';
import { Form, InputNumber, Radio } from 'antd';
import { useEffect } from 'react';
const { Item, useForm, useWatch } = Form;
const DependencyRender = () => {
  const [form] = useForm();
  const productName = useWatch('productName', form);
  useEffect(() => {
    form.setFieldValue('billingMethods', productName);
  }, [form, productName]);
  return (
    <div>
      <Form
        initialValues={{
          orderItem: { discountMethod: DiscountMethod.Rate, discountRate: 50 },
        }}
        form={form}
      >
        <Item label="优惠方式" name={['orderItem', 'discountMethod']}>
          <Radio.Group>
            {Object.entries(DISCOUNT_METHOD_DICT).map(([key, value]) => (
              <Radio key={key} value={parseInt(key)}>
                {value.label}
              </Radio>
            ))}
          </Radio.Group>
        </Item>
        <Item dependencies={[['orderItem', 'discountMethod']]} noStyle>
          {() => {
            const discountMethod = form.getFieldValue([
              'orderItem',
              'discountMethod',
            ]);

            return (
              <>
                {discountMethod === DiscountMethod.Rate && (
                  <Item
                    name={['orderItem', 'discountRate']}
                    label="优惠折扣率"
                    rules={[{ required: true }]}
                  >
                    <InputNumber style={{ width: '100%' }} />
                  </Item>
                )}
                {discountMethod === DiscountMethod.Amount && (
                  <Item
                    name={['orderItem', 'discountPrice']}
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

export default DependencyRender;
