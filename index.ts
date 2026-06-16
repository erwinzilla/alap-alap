import readline from "readline";
import { getProductList } from "./lib/services/products";
import { getRecentOrders } from "./lib/services/orders";
// import { getReturnList } from './returns';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log(`
╔════════════════════════════════╗
║     Shopee Console Manager     ║
╠════════════════════════════════╣
║ 1. Lihat daftar produk         ║
║ 2. Lihat pesanan terbaru       ║
║ 3. Lihat pengembalian barang   ║
║ 4. Keluar                      ║
╚════════════════════════════════╝
  `);

  rl.question("Pilih menu (1-4): ", async (answer) => {
    switch (answer) {
      case "1":
        await getProductList();
        break;
      case "2":
        await getRecentOrders();
        break;
      case "3":
        // await getReturnList();
        break;
      case "4":
        console.log("👋 Sampai jumpa!");
        rl.close();
        return;
      default:
        console.log("❌ Pilihan tidak valid");
    }
    showMenu(); // Loop menu
  });
}

// Jalankan autentikasi dulu sebelum menu
async function main() {
  console.log("🚀 Memulai Shopee Console...");
  console.log(
    "Pastikan Anda sudah menjalankan server autentikasi terlebih dahulu!",
  );
  console.log("Atau jika sudah memiliki token, lanjutkan ke menu.\n");

  showMenu();
}

main();
