import {
  ItemStatus,
  type StockListItem,
  type SearchItemResponse,
  type AddItemParams,
} from "@congminh1254/shopee-sdk/schemas";
import { getAuthenticatedSDK } from "./auth.ts";

interface NewSearchItemResponse extends SearchItemResponse {
  item_id_list: number[];
}

export async function getProductList() {
  const sdk = getAuthenticatedSDK();

  if (sdk == null) return null;
  // Mendapatkan daftar produk dengan pagination
  const products = await sdk.product.getItemList({
    offset: 0,
    page_size: 20,
    item_status: [ItemStatus.NORMAL],
  });

  console.log(`📦 Total produk: ${products.response.total_count}`);
  console.log("Daftar produk:", products.response.item);

  return products;
}

export async function getProductBySKU(sku: string) {
  const sdk = getAuthenticatedSDK();

  if (sdk == null) return null;
  const res = await sdk.product.searchItem({
    page_size: 10,
    item_sku: sku,
  });

  const response = res.response as unknown as NewSearchItemResponse;
  const id = response.item_id_list[0];

  const product = await sdk.product.getItemBaseInfo({
    item_id_list: [id],
  });

  const variant = await sdk.product.getModelList({
    item_id: id,
  });

  return {
    product: product.response?.item_list[0],
    variant: variant.response,
  };
}

export async function getProductDetail(id: number) {
  const sdk = getAuthenticatedSDK();

  if (sdk == null) return null;
  const product = await sdk.product.getItemBaseInfo({
    item_id_list: [id],
  });

  const variant = await sdk.product.getModelList({
    item_id: id,
  });

  return {
    product: product.response?.item_list[0],
    variant: variant.response,
  };
}

export async function updateProductStock(
  itemId: number,
  stocks: StockListItem[],
) {
  const sdk = getAuthenticatedSDK();

  if (sdk == null) return null;
  const result = await sdk.product.updateStock({
    item_id: itemId,
    stock_list: stocks,
  });

  console.log(`✅ Stok produk ${itemId} berhasil diupdate`);
  return result;
}

// export async function createNewProduct(productData: AddItemParams) {
//   const sdk = getAuthenticatedSDK();

//   const newProduct = await sdk.product.addItem({
//     item_name: productData.item_name,
//     description: productData.description,
//     seller_stock: productData.seller_stock,
//     category_id: productData.categoryId,
//     weight: productData.weight,
//     // ... properti lainnya
//   });

//   console.log(`✅ Produk baru berhasil dibuat: ${newProduct.item_id}`);
//   return newProduct;
// }
