// import { getAuthenticatedSDK } from './auth';

// export async function createVoucher(voucherData: {
//   voucherName: string;
//   discountAmount: number;
//   startTime: number;
//   endTime: number;
// }) {
//   const sdk = getAuthenticatedSDK();
  
//   const voucher = await sdk.voucher.addVoucher({
//     voucher_name: voucherData.voucherName,
//     discount_amount: voucherData.discountAmount,
//     start_time: voucherData.startTime,
//     end_time: voucherData.endTime,
//   });
  
//   console.log(`✅ Voucher ${voucherData.voucherName} berhasil dibuat`);
//   return voucher;
// }