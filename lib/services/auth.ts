import { ShopeeSDK } from "@congminh1254/shopee-sdk";
import { ShopeeRegion } from "@congminh1254/shopee-sdk/schemas";
import dotenv from "dotenv";

dotenv.config();

// Inisialisasi SDK dengan kredensial dari environment
const sdk = new ShopeeSDK({
  partner_id: parseInt(process.env.SHOPEE_PARTNER_ID!),
  partner_key: process.env.SHOPEE_PARTNER_KEY!,
  region: ShopeeRegion.TEST_GLOBAL,
  shop_id: parseInt(process.env.SHOPEE_SHOP_ID!), // optional
});

// STEP 1: Generate URL untuk redirect seller
export function getAuthUrl(redirectUri: string): string {
  const authUrl = sdk.getAuthorizationUrl(redirectUri);
  console.log("🔗 Arahkan seller ke URL berikut untuk memberikan izin:");
  console.log(authUrl);
  return authUrl;
}

// STEP 2: Handle callback dari Shopee dan tukar code dengan access token
export async function handleCallback(authCode: string): Promise<void> {
  console.log("📝 Menerima authorization code:", authCode);

  // SDK akan otomatis menukar code dengan token dan menyimpannya
  await sdk.authenticateWithCode(authCode);

  // ✅ FIX: Pastikan shop_id tersedia di token
  const token = await sdk.getAuthToken();
  if (
    token &&
    !token.shop_id &&
    token.shop_id_list &&
    token.shop_id_list?.length > 0
  ) {
    console.log("🔧 Fixing token: adding shop_id property...");
    token.shop_id = token.shop_id_list[0];

    // Simpan kembali token yang sudah diperbaiki
    const tokenPath = `./.token/${token.shop_id}.json`;
    const fs = await import("fs/promises");
    await fs.writeFile(tokenPath, JSON.stringify(token, null, 2));
    console.log(`✅ Token fixed with shop_id: ${token.shop_id}`);
  }

  console.log("✅ Autentikasi berhasil! Token tersimpan otomatis.");
}

// STEP 3: Fungsi untuk mendapatkan instance SDK yang sudah terautentikasi
export function getAuthenticatedSDK(): ShopeeSDK {
  return sdk;
}
