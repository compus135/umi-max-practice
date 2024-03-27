# README

`@umijs/max` 模板项目，更多功能参考 [Umi Max 简介](https://umijs.org/docs/max/introduce)

## 规范

- 常量：大写字母和下划线组成，如：export const DEFAULT_NAME = 'Umi Max';
- 枚举：驼峰且首字母大写，如：`export enum DiscountMethod {   Rate = 1,   Amount = 2, }`
- 类型：驼峰且首字母大写，如：`declare namespace API_PRODUCT { interface ProductConfig {   id: number;   configKey: string;   configValue: string; } }`
- 字典定义：定义枚举值，然后基于枚举值定义字典，如：

```
export enum BillingType {
  PrePay = 1,
  PostPay = 2,
}

export const Billing_TYPE_DICT = {
  [BillingType.PrePay]: { label: '预付费' },
  [BillingType.PostPay]: { label: '后付费' },
};

```

- 页面代码结构推荐

文件夹结构和路径匹配。

为了让项目代码组织更加规范，让开发能够更方便的定位到相关页面组件代码，我们定义了一套规范，该规范当前只作为推荐的指导，并非强制。

```
src
├── components
└── pages
    ├── Welcome        // 路由组件下不应该再包含其他路由组件，基于这个约定就能清楚的区分路由组件和非路由组件了
    |   ├── components // 对于复杂的页面可以再自己做更深层次的组织，但建议不要超过三层
    |   ├── Form.tsx
    |   ├── index.tsx  // 页面组件的代码
    |   └── index.less // 页面样式
    ├── Order          // 路由组件下不应该再包含其他路由组件，基于这个约定就能清楚的区分路由组件和非路由组件了
    |   ├── index.tsx
    |   └── index.less
    ├── User
    |   ├── components // group 下公用的组件集合
    |   ├── Login      // group 下的页面 Login
    |   ├── Register   // group 下的页面 Register
    |   └── util.ts    // 这里可以有一些共用方法之类，不做推荐和约束，看业务场景自行做组织
    └── *              // 其它页面组件代码
```

所有路由组件（会配置在路由配置中的组件）我们推荐以大驼峰命名打平到 pages 下面第一级（复杂的项目可以增加 group 层级，在 group 下放置 pages）。不建议在路由组件内部再嵌套路由组件 - 不方便分辨一个组件是否是路由组件，而且不方便快速从全局定位到路由组件。

我们推荐尽可能的拆分路由组件为更细粒度的组件，对于多个页面可能会用到的组件我们推荐放到 src/components 中，对于只是被单个页面依赖的（区块）组件，我们推荐就近维护到路由组件文件夹下即可。

## 最佳实践

### 项目的稳定性

- package.json 使用精确版本号的包
- 使用lock文件，以保证间接依赖包被精确锁定

### 基于路由信息生成菜单

假设角色A和角色B看到的菜单结构不同。

方案一：

- 使角色A和角色B所有路由都不相同
- 通过 access 区分

```
  {
    path: '/a',
    name: 'A',
    component: './A',
    access: 'roleA',
  },
  {
    path: '/b',
    name: 'B',
    component: './B',
    access: 'roleB',
  },
```

方案二：

- 角色A和角色B的路由分别存放在a,b 中，公共部分放在common中，菜单的顺序通过 order 定义
- 通过 `{layout:{menu:request}}` 生成菜单。

```
  layout{
    menu: {
      request() {
        if (roleA) {
          return [...(role === roleA ? a: b), ...common].sort((a, b) => {
            return (a.order || Infinity) - (b.order || Infinity);
          });
        }
      },
    },
  }
```

### 国际化

```
1. 在 `src/locales` 目录下创建多语言文件 `zh-CN.ts` 和 `en-US.ts`

2. 语言内容：
export default {
  msg: '您好！',
};

3. 在组件中使用：

import { useIntl } from '@umijs/max';

const Locale = () => {
  const intl = useIntl();
  const msg = intl.formatMessage({ id: 'msg' });
  return <div>{msg}</div>;
};

4. 动态添加多语言：
 addLocale(
   'zh-CN',
   {
     welcome: '欢迎！',
   },
   {
     momentLocale: 'zh-CN',
     antd: zh_CN,
   },
 );

5. 文本常量：

export const Billing_TYPE_DICT = {
  PrePay: { labelLocaleId: 'prepay' },
};
// 组件中使用
{intl.formatMessage({ id: Billing_TYPE_DICT.PrePay.labelLocaleId })}

6. 在`.umirc.ts`中配置国际化插件：

locale:{}

7. 切换语言：`<SelectLang reload={false} />`
```

### 构建和部署

- 部署到非根目录下

```

1. 首先要更新页面路由如 localhost:80/ 转为 localhost:80/b, 其次生成的静态资源要更改绝对路径。.umirc.ts 配置 base, publicPath, 如：{ base: '/b/', publicPath: '/b/', }

2. 如果静态资源是项目外的，放在public目录下，则需手动修改使用这些资源的地方。如： <Image src="/logo.png" /> 转为 <Image src="/b/logo.png" /> 使用项目内的静态资源，放在 src/assets目录下，无需改动。如：import imageUrl from '@/assets/image.png' <Image src={imageUrl} />

3. nginx 配置，根据 base 将dist重命名并放在根目录下。配置如：location /a { root html; try_files $uri $uri/ /a/index.html$args index index.html; } location /b { root html; try_files $uri $uri/ /b/index.html$args index index.html; }

```

### 样式

- Table: 内容不换行，宽度撑满父元素，当宽度超出父元素出现滚动条。`scroll:{x:'max-content'}`
- 输入框响应式宽度，在较大的显示屏上保持固定的宽度，而在较小的屏幕或窄窗口上能够自适应父容器的宽度 `width, max-width`
- form horizontal 小于575则变为上下，一般设为：`{         labelCol: { span: 4 },         wrapperCol: { span: 14 },       }`

### request

- 请求异常处理：`responseInterceptors` 响应拦截和处理 2xx 中业务错误，`errorHandler` 处理非 2xx 错误和`responseInterceptors`抛出的错误。参考`requestErrorConfig`

### 表单

- 表单项的值相互依赖：

```

import { Form, Input } from 'antd'; import { useEffect } from 'react'; const { Item, useForm, useWatch } = Form; const Welcome = () => { const [form] = useForm(); const productName = useWatch('productName', form); useEffect(() => { form.setFieldValue('billingMethods', productName); }, [form, productName]); return ( <div> <Form initialValues={{ productName: 'name1' }} form={form}> <Item label="产品名称" name={'productName'}> <Input /> </Item>

        <Item label="产品项" name="billingMethods">
          <Input />
        </Item>
      </Form>
    </div>

); };

export default Welcome;

```

- 表单项渲染依赖：

```

import { DISCOUNT_METHOD_DICT, DiscountMethod } from '@/constants/product'; import { Form, InputNumber, Radio } from 'antd'; import { useEffect } from 'react'; const { Item, useForm, useWatch } = Form; const DependencyRender = () => { const [form] = useForm(); const productName = useWatch('productName', form); useEffect(() => { form.setFieldValue('billingMethods', productName); }, [form, productName]); return ( <div> <Form initialValues={{
          orderItem: { discountMethod: DiscountMethod.Rate, discountRate: 50 },
        }} form={form} > <Item label="优惠方式" name={['orderItem', 'discountMethod']}> <Radio.Group> {Object.entries(DISCOUNT_METHOD_DICT).map(([key, value]) => ( <Radio key={key} value={parseInt(key)}> {value.label} </Radio> ))} </Radio.Group> </Item> <Item dependencies={[['orderItem', 'discountMethod']]} noStyle> {() => { const discountMethod = form.getFieldValue([ 'orderItem', 'discountMethod', ]);

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

); };

export default DependencyRender;

```

- useWatch 监听字段变化，form.setFieldValue(key,value)、手动输入引起的改变useWatch 都可以监听到。

```

import { Button, Form, Input } from 'antd'; import { useEffect } from 'react'; const { Item, useForm, useWatch } = Form; const UseWatchAndSetFieldValue = () => { const [form] = useForm(); const productName = useWatch('productName', form); useEffect(() => { form.setFieldValue('billingMethods', productName); }, [form, productName]); return ( <div> <Form initialValues={{ productName: 'name1' }} form={form}> <Item label="产品名称" name={'productName'}> <Input /> </Item>

        <Item label="产品项" name="billingMethods">
          <Input />
        </Item>
      </Form>
      <Button
        onClick={() => {
          form.setFieldValue('productName', 'xx');
        }}
      >
        change productName
      </Button>
    </div>

); };

export default UseWatchAndSetFieldValue;

```

- dependencies 更新，通过form.setFieldValue 改变值无法触发依赖更新。表单值的变化都会调用`shouldUpdate()`, 比较原先的值和当前的值比较决定是否需要渲染。参考 `form/dependencyRender2`

- 表单初始值，当表单加载后更新初始值可通过key来实现

```

<Form form={form} onFinish={onFinish} key={profiles ? 'hasProfiles' : 'noProfiles'}>
</Form>
```

- <Form.Item>内有多个元素，可以使用内嵌的 Form.Item 完成。参考`form/Demo06`

- 可以自定义表单控件。`form/Demo07`

## 操作

- 新建pnpm dlx create-umi@latest > select ant design pro > select pnpm

## 开发流

- 新建pnpm dlx create-umi@latest > select ant design pro > select pnpm

- mock data: 以 API 为主线创建 mock 数据 mock/product.ts 》创建 services/product/typings.d.ts 》创建 constants/product.ts 枚举及常量部分 》创建 services/product/index.ts mock/organization.ts 示例：

```
export const productList = [
  {
    id: 0,
    code: 'string',
    name: 'string',
    category: 0,
    status: 0,
    configs: [
      {
        id: 0,
        configKey: 'string',
        configValue: 'string',
      },
    ],
    billingMethods: [
      {
        id: 0,
        methodId: 0,
        methodSeq: 0,
        dcuPrice: 0,
        dcuCny: 0,
        cnyPrice: 0,
        priceUnit: 0,
        discountMethod: 0,
        discountRate: 0,
        discountPrice: 0,
        discountedPrice: 0,
      },
    ],
  },
];

export const billingMethods = [
  {
    id: 0,
    type: 1,
    method: 1,
    name: '预付费-包年包月-月-DCU',
    cycle: 1,
    description: 'string',
    isDcu: true,
    creator: 0,
    createTs: '2024-01-12T17:15:21.143Z',
    updater: 0,
    updateTs: '2024-01-12T17:15:21.143Z',
    isDeleted: 0,
  },
  {
    id: 0,
    type: 1,
    method: 1,
    name: '预付费-包年包月-月-非DCU',
    cycle: 1,
    description: 'string',
    isDcu: false,
    creator: 0,
    createTs: '2024-01-12T17:15:21.143Z',
    updater: 0,
    updateTs: '2024-01-12T17:15:21.143Z',
    isDeleted: 0,
  },
];

```

services/product/typings.d.ts 示例：

```
import {
  BillingCycle,
  BillingMode,
  BillingType,
  DiscountMethod,
  ProductStatus,
} from '@/constants/product';

declare namespace API_PRODUCT {
  interface ProductConfig {
    id: number;
    configKey: string;
    configValue: string;
  }
  // 计费方式
  interface BillingMethod {
    id: number;
    type: BillingType;
    method: BillingMode;
    name: string; // 计费项名称
    cycle: BillingCycle;
    description: string; // 计费说明
    isDcu: boolean; // 是否dcu(datacavas unit)计费：1-是；0-否
  }

  // 计费项
  interface BillingItem {
    id: number;
    methodId: number;
    methodSeq: number;
    dcuPrice?: number; // DCU单价
    dcuCny?: number; // DCU和CNY 换算比例
    cnyPrice: number; // 单价
    priceUnit: number; // 单价单位
    discountMethod: DiscountMethod;
    discountRate?: number; // 优惠折扣率
    discountPrice?: number; // 优惠金额
    discountedPrice: number; // 优惠后价格
  }

  interface Product {
    id: number;
    code: string;
    name: string;
    category: number;
    status: ProductStatus;
    configs: ProductConfig[];
    billingMethods: BillingItem[];
  }
}

```

constants/product.ts 枚举及常量部分示例：

```
// 产品状态；0-未上架、1-已上架、2-已下架
export enum ProductStatus {
  NotOn = 0,
  On = 1,
  Off = 2,
}
export const PRODUCT_STATUS_DICT = {
  [ProductStatus.NotOn]: { label: '未上架' },
  [ProductStatus.On]: { label: '已上架' },
  [ProductStatus.Off]: { label: '已下架' },
};

//  优惠方式：1-优惠折扣率；2-优惠金额
export enum DiscountMethod {
  Rate = 1,
  Amount = 2,
}

export const DISCOUNT_METHOD_DICT = {
  [DiscountMethod.Rate]: { label: '优惠折扣率' },
  [DiscountMethod.Amount]: { label: '优惠金额' },
};
// 计费类型：1-预付费；2-后付费
export enum BillingType {
  PrePay = 1,
  PostPay = 2,
}

export const Billing_TYPE_DICT = {
  [BillingType.PrePay]: { label: '预付费' },
  [BillingType.PostPay]: { label: '后付费' },
};
// 计费方式：1-包年包月；2-按量（时长）；3-按量（流量）
export enum BillingMode {
  Month = 1,
}
export const BILLING_MODE_DICT = {
  [BillingMode.Month]: { label: '包年包月' },
};
// 计费周期：1-月；2-小时
export enum BillingCycle {
  Month = 1,
}

export const BILLING_CYCLE_DICT = {
  [BillingCycle.Month]: { label: '月' },
};

```

services/product/index.ts 示例：

```
import { request } from '@umijs/max';
import { billingMethods, productList } from 'mock/product';
import { API_PRODUCT } from './typings';
const baseUrl = '/api/product';
export async function getProducts() {
  return productList;
  return request<API_PRODUCT.Product[]>(`${baseUrl}/list`, {
    method: 'POST',
  });
}

export async function updateProduct(data: Record<string, any>) {
  return request(`${baseUrl}/update`, {
    method: 'POST',
    data,
  });
}

export async function createProduct(data: Record<string, any>) {
  return request(`${baseUrl}/create`, {
    method: 'POST',
    data,
  });
}

export async function getBillingMethods() {
  return billingMethods;
  return request<API_PRODUCT.BillingMethod[]>(`${baseUrl}/listBillingMethod`, {
    method: 'POST',
  });
}

```

- share api data: 服务端数据要作为全局共享数据，使用时共享数据中有就直接使用没有就请求。创建全局共享数据要创建model，这是一个自定义hook，顶层组件渲染时调用该hook，返回的数据存储到全局中:

```
import { getStateList } from '@/services/state';
import {} from '@umijs/max';
import { useCallback, useState } from 'react';

export default function () {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Record<string, API_STATE.State>>({});

  const fetchState = useCallback((flowCode: string) => {
    setLoading(true);
    getStateList(flowCode)
      .then((r) => {
        setList((pre) => ({ ...pre, [flowCode]: r }));
      })
      .finally(() => setLoading(false));
  }, []);

  return { list, loading, fetchState };
}

```

通过 useModel 使用全局数据，useModel(namespace) 方法返回指定命名空间的共享数据，共享数据中没有就要请求数据。使用服务端共享数据的逻辑都一样，可以抽象为一个hook。示例：

```
import { useModel } from '@umijs/max';
import { useEffect } from 'react';

export default function useStatus(flowCode: string) {
  const { list, fetchState } = useModel('state');
  useEffect(() => {
    if (!list[flowCode]) {
      fetchState(flowCode);
    }
  }, [fetchState, flowCode, list]);
  return list[flowCode] || [];
}

```

使用 hook:

```
const orderStatuses = useStatus('order');
```

- 创建静态页面

- 添加反向数据流

- 路由配置：子菜单配置在routes中，否则配置在外层

```
[
    {
    path: '/org',
    name: '企业管理',
    icon: 'smile',
    component: './organization/OrganizationList',
  },
  {
    name: '新建企业',
    path: '/org/create',
    component: './organization/OrganizationEdit',
    hideInMenu: true,
  },
  {
    name: '编辑企业',
    path: '/org/edit',
    component: './organization/OrganizationEdit',
    hideInMenu: true,
  }
  {
    path: '/user',
    name: '人员管理',
    icon: 'TeamOutlined',
    access: 'isAdmin',
    routes: [
      { path: '/user', redirect: '/user/user-list' },
      {
        path: '/user/user-list',
        name: '用户管理',
        component: './user/UserList',
      },
      { path: '/user/group-list', name: '用户组管理', component: './user/UserGroupList' },
    ],
  }
]
```

## QA

1. 表单项嵌套？noStyle 的所有校验状态都会被提升至顶层 FormItem。

```
<Form.Item label="demo">
  <div>
    I am render props
    <Form.Item name="demo" noStyle>
      <Input placeholder="render props" />
    </Form.Item>
  </div>
</Form.Item>
```
