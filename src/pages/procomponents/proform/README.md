## ProForm

- proform 属性

submitter: 定制操作按钮

- 何时使用ProForm

ProForm 与 antd 功能完全对齐，但是在其之上还增加一些预设行为和多种布局 。

- 数据转化

convertValue/dateFormmater/transform

transform: 提交时转化值，一般用于将值转化为提交的数据

```
      <ProFormDatePicker
        name="date"
        transform={(value) => {
          return {
            datexxxxxxxxx: moment(value).unix(),
          };
        }}
      />

```

{datexxxxxxxxx: 172...} 提交

dateFormmater: form 提交时，格式化时间

```
const MyForm = () => (
  <ProForm
    onFinish={async (values) => console.log(values)}
    dateFormatter="YYYY-MM-DD"
  >
    <ProFormDatePicker name="date" label="日期" />
  </ProForm>
);
```

这样，当用户提交表单时，如果选择的日期是2023年4月25日，那么提交的数据中对应的date字段将是字符串"2023-04-25"。

- 代码示例

基本使用`Demo01`

标签与表单项布局：submmiter, layout

## 实践

- autoFocusFirstInput
- request 获取表单初始值

## TODO

- type

```
 options={[
            {
              value: 'time',
              label: '履行完终止',
              type: 'time',
              options: [
                {
                  value: 'time1',
                  label: '履行完终止1',
                },
                {
                  value: 'time2',
                  label: '履行完终止2',
                },
              ],
            },
          ]}
```

- cacheForSwr

```
 <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: '盖章后生效',
            },
          ]}
          readonly
          width="xs"
          cacheForSwr
          name="useMode"
          label="合同约定生效方式"
        />
```

- ProFormMoney

```
 <ProFormMoney
          width="md"
          name="money"
          label="合同约定金额"
          fieldProps={{
            numberPopoverRender: true,
          }}
        />
```

- denpendencies

```
  <ProFormText
          width="md"
          name="name"
          required
          dependencies={[['contract', 'name']]}
          addonBefore={<a>客户名称应该怎么获得？</a>}
          addonAfter={<a>点击查看更多</a>}
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
          rules={[{ required: true, message: '这是必填项' }]}
        />
```

- form

```
formRef.current?.validateFields()

formRef.current?.validateFieldsReturnFormatValue?.();
```

- Proform

```
params={{ id: '100' }}
formKey="base-form-use-demo"
```
