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

## 操作

- 新建pnpm dlx create-umi@latest > select ant design pro > select pnpm

## 开发流

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
