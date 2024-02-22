import { SelectLang, useIntl } from '@umijs/max';

const Locale = () => {
  const intl = useIntl();
  return (
    <div>
      <div>中文{intl.formatMessage({ id: 'msg', defaultMessage: '' })}</div>
      <SelectLang reload={false} />
    </div>
  );
};

export default Locale;
