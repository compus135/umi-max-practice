import { SelectLang, useIntl } from '@umijs/max';

const Locale = () => {
  const intl = useIntl();
  return (
    <div>
      <div>
        {intl.formatMessage({ id: 'msg', defaultMessage: '' })}
        {intl.formatMessage({ id: 'info', defaultMessage: '' })}
      </div>
      <SelectLang reload={false} />
    </div>
  );
};

export default Locale;
