// 运行时配置

import { addLocale } from '@umijs/max';
import en_US from 'antd/es/locale/en_US';
import zh_CN from 'antd/es/locale/zh_CN';
import { requestConfig } from './requestErrorConfig';
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  addLocale('zh-CN', { info: '信息' }, { momentLocale: 'zh-CN', antd: zh_CN });
  addLocale('en-US', { info: 'info' }, { momentLocale: 'en-US', antd: en_US });
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

export const request = requestConfig;
