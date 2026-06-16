// fix-token.js
const fs = require("fs");
const path = require("path");

const tokenPath = path.join(__dirname, ".token", "227645667.json");

try {
  const tokenData = JSON.parse(fs.readFileSync(tokenPath, "utf8"));

  // Tambahkan shop_id langsung jika belum ada
  if (
    !tokenData.shop_id &&
    tokenData.shop_id_list &&
    tokenData.shop_id_list.length > 0
  ) {
    tokenData.shop_id = tokenData.shop_id_list[0];
    fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2));
    console.log("✅ Fixed: Added shop_id to token");
    console.log("Shop ID:", tokenData.shop_id);
  } else {
    console.log("✅ Token already has shop_id:", tokenData.shop_id);
  }
} catch (error) {
  console.error("❌ Error fixing token:", error.message);
}
