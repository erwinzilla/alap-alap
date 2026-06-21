<script setup lang="ts"></script>

<template>
  <!-- ====== NAVBAR ====== -->
  <nav
    class="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 shadow-sm sticky top-0 z-50"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center gap-3">
          <span class="text-2xl">🦅</span>
          <span class="font-bold text-xl">Shopee Console</span>
          <span
            class="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-400 px-2 py-0.5 rounded-full font-medium"
            >Alap Alap</span
          >
        </div>
        <div class="flex items-center gap-4">
          <span
            id="statusBadge"
            class="flex items-center gap-2 text-sm bg-green-50 dark:bg-green-900 text-green-700 px-3 py-1.5 rounded-full"
          >
            <span class="status-dot inline-block w-2 h-2 rounded-full bg-green-500"></span>
            <span id="statusText">Online</span>
          </span>
          <a
            href="/auth/shopee"
            class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
          >
            <i class="fas fa-plug"></i> Connect Shopee
          </a>
        </div>
      </div>
    </div>
  </nav>

  <!-- ====== MAIN CONTENT ====== -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- === GREETING === -->
    <div class="mb-8 fade-in">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-500 mt-1">Kelola toko Shopee Anda dari satu tempat.</p>
    </div>

    <!-- === STATS CARDS === -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 fade-in">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 card-hover">
        <div class="flex items-center justify-between">
          <span class="text-gray-400 text-sm font-medium">Total Produk</span>
          <i class="fas fa-boxes text-2xl text-blue-400"></i>
        </div>
        <p id="totalProducts" class="text-3xl font-bold text-gray-800 mt-2">—</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 card-hover">
        <div class="flex items-center justify-between">
          <span class="text-gray-400 text-sm font-medium">Pesanan Hari Ini</span>
          <i class="fas fa-shopping-cart text-2xl text-orange-400"></i>
        </div>
        <p id="todayOrders" class="text-3xl font-bold text-gray-800 mt-2">—</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 card-hover">
        <div class="flex items-center justify-between">
          <span class="text-gray-400 text-sm font-medium">Stok Menipis</span>
          <i class="fas fa-exclamation-triangle text-2xl text-yellow-400"></i>
        </div>
        <p id="lowStock" class="text-3xl font-bold text-gray-800 mt-2">—</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 card-hover">
        <div class="flex items-center justify-between">
          <span class="text-gray-400 text-sm font-medium">Status Auth</span>
          <i id="authIcon" class="fas fa-circle text-2xl text-red-400"></i>
        </div>
        <p id="authStatus" class="text-3xl font-bold text-gray-800 mt-2">—</p>
      </div>
    </div>

    <!-- === TABEL PRODUK === -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 fade-in">
      <div class="flex items-center justify-between mb-4 px-5 pt-5">
        <h2 class="text-lg font-semibold text-gray-800">
          <i class="fas fa-list-ul text-orange-500 mr-2"></i> Produk Terbaru
        </h2>
        <button
          id="refreshProductsBtn"
          class="text-sm text-orange-500 hover:text-orange-700 font-medium flex items-center gap-1"
        >
          <i class="fas fa-sync-alt"></i> Refresh
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nama Produk
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                SKU
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stok
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Harga
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody id="productTableBody" class="bg-white divide-y divide-gray-100">
            <tr>
              <td colspan="5" class="px-4 py-8 text-center text-gray-400 text-sm">
                <i class="fas fa-spinner fa-spin mr-2"></i> Memuat produk...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- === FOOTER === -->
    <div class="mt-8 text-center text-xs text-gray-400 border-t border-gray-200 pt-6">
      <p>
        🦅 Shopee Console &mdash; Dibangun dengan ❤️ menggunakan Node.js, Express &amp; Tailwind CSS
      </p>
      <p class="mt-1">Versi 1.0.0</p>
    </div>
  </main>
</template>

<style scoped></style>
