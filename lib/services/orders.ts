import { getAuthenticatedSDK } from './auth';

export async function getRecentOrders() {
  const sdk = getAuthenticatedSDK();
  
  // Mendapatkan pesanan dari 7 hari terakhir
  const sevenDaysAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);
  
  const orders = await sdk.order.getOrderList({
    time_range_field: 'create_time',
    time_from: sevenDaysAgo,
    time_to: Math.floor(Date.now() / 1000),
    page_size: 50,
  });
  
  console.log(`📋 Total pesanan: ${orders.response.order_list.length}`);
  
  // Tampilkan detail pesanan
  for (const order of orders.response.order_list) {
    console.log(`- Order ${order.order_sn}: Status ${order.order_status}`);
  }
  
  return orders;
}

export async function getOrderDetail(orderSn: string) {
  const sdk = getAuthenticatedSDK();
  
  const orderDetail = await sdk.order.getOrdersDetail({
    order_sn_list: [orderSn],
  });
  
  return orderDetail;
}

// export async function acknowledgeOrder(orderSn: string) {
//   const sdk = getAuthenticatedSDK();
  
//   // Konfirmasi pesanan (setelah seller memproses)
//   const result = await sdk.order.acknowledgeOrder({
//     order_sn: orderSn,
//   });
  
//   console.log(`✅ Pesanan ${orderSn} telah dikonfirmasi`);
//   return result;
// }