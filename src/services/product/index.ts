import { request } from '@umijs/max';
import { billingMethods, productList } from 'mock/product';
import { API_PRODUCT } from './typings';
const baseUrl = '/api/product';
export async function getProducts() {
  return productList;
  return request<API_PRODUCT.Product[]>(`${baseUrl}/list`, {
    method: 'POST',
  });
}

export async function updateProduct(data: Record<string, any>) {
  return request(`${baseUrl}/update`, {
    method: 'POST',
    data,
  });
}

export async function createProduct(data: Record<string, any>) {
  return request(`${baseUrl}/create`, {
    method: 'POST',
    data,
  });
}

export async function getBillingMethods() {
  return billingMethods;
  return request<API_PRODUCT.BillingMethod[]>(`${baseUrl}/listBillingMethod`, {
    method: 'POST',
  });
}
