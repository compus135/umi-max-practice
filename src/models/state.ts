import { getStateList } from '@/services/state';
import {} from '@umijs/max';
import { useCallback, useState } from 'react';

export default function () {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Record<string, API_STATE.State>>({});

  const fetchState = useCallback((flowCode: string) => {
    setLoading(true);
    getStateList(flowCode)
      .then((r) => {
        setList((pre) => ({ ...pre, [flowCode]: r }));
      })
      .finally(() => setLoading(false));
  }, []);

  return { list, loading, fetchState };
}
