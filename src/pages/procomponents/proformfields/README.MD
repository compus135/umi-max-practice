## ProFormFields - 表单项

- 给表单项的props，是`Form.Item`的，`fieldProps`才是给包含的组件的。同时支持placeholder的透传。ProFormText 是 FormItem + Input 的产物，可以类比于以下的代码：

```
const ProFormText = (props) => {
  <Form.Item {...props}>
    <Input placeholder={props.placeholder} {...props.fieldProps} />
  </Form.Item>;
};
```

- TODO : 组件列表

## 最佳实践

- ProFormDigit: 数字
- ProFormMoney: 钱
