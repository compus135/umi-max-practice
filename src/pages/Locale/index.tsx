import { Billing_TYPE_DICT } from '@/constants';
import { SelectLang, addLocale, useIntl } from '@umijs/max';
import en_US from 'antd/es/locale/en_US';
import zh_CN from 'antd/es/locale/zh_CN';

const Locale = () => {
  const intl = useIntl();
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
  addLocale(
    'en-US',
    {
      welcome: 'welcome!',
    },
    {
      momentLocale: 'en-US',
      antd: en_US,
    },
  );
  return (
    <div>
      <div>
        {/* 项目引入 */}
        {intl.formatMessage({ id: 'msg', defaultMessage: '' })}
        {/* 常量 */}
        {intl.formatMessage({ id: Billing_TYPE_DICT.PrePay.labelLocaleId })}
        {/* 动态引入 */}
        {intl.formatMessage({ id: 'welcome', defaultMessage: '' })}
      </div>
      <SelectLang reload={false} />
    </div>
  );
};

export default Locale;
// 定义在非组件中的文本常量如何处理
