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
