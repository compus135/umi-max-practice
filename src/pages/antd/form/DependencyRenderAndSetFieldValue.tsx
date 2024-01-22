import { DISCOUNT_METHOD_DICT, DiscountMethod } from '@/constants/product';
import { Button, Form, InputNumber, Radio } from 'antd';
const { Item, useForm } = Form;
const DependencyRenderAndSetFieldValue = () => {
  const [form] = useForm();
  return (
    <div>
      <Form
        initialValues={{
          discountMethod: DiscountMethod.Rate,
          discountRate: 50,
        }}
        form={form}
      >
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

      <Button
        onClick={() => {
          form.setFieldsValue({ discountMethod: DiscountMethod.Amount });
        }}
      >
        setFieldValue
      </Button>
    </div>
  );
};

export default DependencyRenderAndSetFieldValue;
