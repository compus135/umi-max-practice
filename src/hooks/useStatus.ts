import { useModel } from '@umijs/max';
import { useEffect } from 'react';

export default function useStatus(flowCode: string) {
  const { list, fetchState } = useModel('state');
  useEffect(() => {
    if (!list[flowCode]) {
      fetchState(flowCode);
    }
  }, [fetchState, flowCode, list]);
  return list[flowCode] || [];
}
