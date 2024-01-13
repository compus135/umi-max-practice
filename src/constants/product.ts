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
