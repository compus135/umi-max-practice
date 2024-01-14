import Guide from '@/components/Guide';
import useStatus from '@/hooks/useStatus';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const orderStatuses = useStatus('order');
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
        <Guide name={JSON.stringify(orderStatuses)} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
