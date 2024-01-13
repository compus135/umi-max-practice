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
