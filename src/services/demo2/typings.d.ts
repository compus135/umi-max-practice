declare namespace API_PRODUCT {
  // 产品状态；0-未上架、1-已上架、2-已下架
  enum ProductStatus {
    NotOn = 0,
    On = 1,
    Off = 2,
  }
  interface Product {
    id: number;
    code: string;
    name: string;
    category: number;
    status: ProductStatus;
  }
}
