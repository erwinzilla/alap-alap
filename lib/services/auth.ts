// auth.ts
import 'dotenv/config';
import { ShopeeSDK } from "@congminh1254/shopee-sdk";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ShopeeRegion } from '@congminh1254/shopee-sdk/schemas';

// Setup __dirname untuk ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let sdk: ShopeeSDK | null = null;
let isAuthenticated = false;

function initSDK() {
  if (!sdk) {
    console.log('🔧 Initializing Shopee SDK...');
    
    const partnerId = process.env.SHOPEE_PARTNER_ID;
    const partnerKey = process.env.SHOPEE_PARTNER_KEY;
    const shopId = process.env.SHOPEE_SHOP_ID;
    
    if (!partnerId || !partnerKey) {
      throw new Error('Missing SHOPEE_PARTNER_ID or SHOPEE_PARTNER_KEY in .env');
    }
    
    sdk = new ShopeeSDK({
      partner_id: parseInt(partnerId),
      partner_key: partnerKey,
      region: ShopeeRegion.TEST_GLOBAL,
      shop_id: shopId ? parseInt(shopId) : undefined,
    });
    
    console.log('✅ SDK initialized');
  }
  return sdk;
}

export function getAuthUrl(redirectUri: string): string {
  const sdk = initSDK();
  return sdk.getAuthorizationUrl(redirectUri);
}

export async function handleCallback(authCode: string): Promise<void> {
  const sdk = initSDK();
  console.log('📝 Exchanging code for token...');
  await sdk.authenticateWithCode(authCode);
  isAuthenticated = true;
  console.log('✅ Authentication successful! Token saved.');
}

export function getAuthenticatedSDK(): ShopeeSDK | null {
  if (!sdk) {
    console.warn('⚠️ SDK not initialized yet');
    return null;
  }
  return sdk;
}

// ✅ FUNGSI getAuthStatus - Versi yang Aman
export function getAuthStatus() {
  // Cek apakah ada file token di folder .token
  const shopId = process.env.SHOPEE_SHOP_ID || 'default';
  const tokenPath = path.join(__dirname, '.token', `${shopId}.json`);
  
  let hasToken = false;
  let tokenData: any = null;
  
  try {
    if (fs.existsSync(tokenPath)) {
      const fileContent = fs.readFileSync(tokenPath, 'utf8');
      tokenData = JSON.parse(fileContent);
      hasToken = !!tokenData?.access_token;
    }
  } catch (error) {
    console.warn('⚠️ Could not read token file:', error);
    hasToken = false;
  }
  
  return {
    initialized: !!sdk,
    authenticated: isAuthenticated || hasToken,
    hasShopId: !!process.env.SHOPEE_SHOP_ID,
    shopId: process.env.SHOPEE_SHOP_ID || null,
    tokenExists: hasToken,
    tokenExpired: tokenData?.expired_at ? tokenData.expired_at < Date.now() : true,
  };
}