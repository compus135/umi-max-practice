import { orderStatusList } from '@/mock/state';
import { request } from '@umijs/max';
const baseUrl = '/api/state';
export async function getStateList(flowCode: string) {
  return orderStatusList;
  return request(`${baseUrl}/listByFlowCode`, {
    method: 'POST',
    data: { flowCode },
  });
}
