<script setup lang="ts">
import CardStat from '@/components/card/CardStat.vue'
import ContentBase from '@/components/ContentBase.vue'
import NavbarBase from '@/components/navbar/NavbarBase.vue'
</script>

<template>
  <NavbarBase></NavbarBase>

  <ContentBase title="Dashboard" desc="Kelola toko Shopee Anda dari satu tempat.">
    <!-- === STATS CARDS === -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 fade-in">
      <CardStat title="Total Produk"></CardStat>
      <CardStat title="Pesanan Hari Ini" color="orange" icon="shopping-cart"></CardStat>
      <CardStat title="Stok Menipis" color="yellow" icon="warning"></CardStat>
      <CardStat title="Status Auth" color="red" icon="plugs-connected"></CardStat>
    </div>

    <!-- === TABEL PRODUK === -->
    <div class="bg-white rounded-xl shadow-sm border border-stone-100 fade-in">
      <div class="flex items-center justify-between mb-4 px-5 pt-5">
        <h2 class="text-lg font-semibold text-stone-800">
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
        <table class="min-w-full divide-y divide-stone-200">
          <thead class="bg-stone-50">
            <tr>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider"
              >
                Nama Produk
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider"
              >
                SKU
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider"
              >
                Stok
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider"
              >
                Harga
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody id="productTableBody" class="bg-white divide-y divide-stone-100">
            <tr>
              <td colspan="5" class="px-4 py-8 text-center text-stone-400 text-sm">
                <i class="fas fa-spinner fa-spin mr-2"></i> Memuat produk...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- === FOOTER === -->
    <div class="mt-8 text-center text-xs text-stone-400 border-t border-stone-200 pt-6">
      <p>
        🦅 Shopee Console &mdash; Dibangun dengan ❤️ menggunakan Node.js, Express &amp; Tailwind CSS
      </p>
      <p class="mt-1">Versi 1.0.0</p>
    </div>
  </ContentBase>
</template>

<style scoped></style>
