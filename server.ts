import express from "express";
import { getAuthUrl, handleCallback } from "./lib/services/auth.ts";
import { getProductBySKU, getProductDetail } from "./lib/services/products.ts";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

async function startServer() {
  try {
    console.log("🚀 Starting server...");

    const app = express();
    const PORT = parseInt(process.env.APP_PORT ?? "3001");

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // === Middleware ===
    // 1. Serve static files dari folder 'public'
    // app.use(express.static(path.join(__dirname, "public")));

    // 2. Untuk parsing JSON (jika ada POST)
    // app.use(express.json());

    console.log("📝 Setting up routes...");

    // async function ensureShopId(sdk: any) {
    //   try {
    //     const token = await sdk.getAuthToken();
    //     if (token && !token.shop_id && token.shop_id_list?.length > 0) {
    //       token.shop_id = token.shop_id_list[0];
    //       console.log("✅ shop_id added to token runtime:", token.shop_id);
    //     }
    //     return token;
    //   } catch (error) {
    //     console.error("Error ensuring shop_id:", error);
    //   }
    // }
    function handleError(res: any, error: any) {
      console.error("❌ Detailed error:", error);

      res.json({
        status: "error",
        message: error.data.message,
      });
    }

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    });

    app.get("/auth/shopee", (req, res) => {
      console.log("🔑 Route /auth/shopee dipanggil");
      const redirectUri = `${process.env.APP_REDIRECT}/auth/shopee/callback`;
      const authUrl = getAuthUrl(redirectUri);
      res.redirect(authUrl);
    });

    app.get("/auth/shopee/callback", async (req, res) => {
      console.log("📞 Route /auth/shopee/callback dipanggil");
      const { code } = req.query;

      if (!code) {
        return res.status(400).send("Missing authorization code");
      }

      try {
        await handleCallback(code as string);
        res.send("<h1>✅ Autentikasi Berhasil!</h1>");
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Autentikasi gagal");
      }
    });

    // Tambahkan di server.ts, sebelum app.listen()
    app.get("/api/product", async (req, res) => {
      try {
        const { sku } = req.query;

        const product = await getProductBySKU(sku as string);

        res.json({
          status: "success",
          message: "sukses mengambil data produk",
          data: product,
        });
      } catch (error: any) {
        handleError(res, error);
      }
    });

    app.get("/api/product/:id", async (req, res) => {
      try {
        const { id } = req.params;

        const product = await getProductDetail(parseInt(id));

        console.log("4️⃣ Response received:", JSON.stringify(product, null, 2));

        res.json({
          status: "success",
          message: "sukses mengambil data produk",
          data: product,
        });
      } catch (error: any) {
        handleError(res, error);
      }
    });

    console.log("🎯 Starting listener...");
    app.listen(PORT, () => {
      console.log(`✅ Server berjalan di http://localhost:${PORT}`);
      console.log(`🌐 Buka: http://localhost:${PORT}/auth/shopee`);
    });
  } catch (error) {
    console.error("❌ FATAL ERROR:", error);
  }
}

startServer();
