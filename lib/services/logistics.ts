import { getAuthenticatedSDK } from './auth';

export async function getShippingParameter(orderSn: string) {
  const sdk = getAuthenticatedSDK();
  
  const shipping = await sdk.logistics.getShippingParameter({
    order_sn: orderSn,
  });
  
  console.log(`🚚 Parameter pengiriman untuk order ${orderSn}:`, shipping);
  return shipping;
}

export async function createShippingOrder(orderSn: string, logisticId: number) {
  const sdk = getAuthenticatedSDK();
  
  const result = await sdk.logistics.shipOrder({
    order_sn: orderSn,
    logistic_id: logisticId,
  });
  
  console.log(`✅ Pesanan ${orderSn} telah dikirim`);
  return result;
}