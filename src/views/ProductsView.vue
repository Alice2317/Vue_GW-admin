<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <h2>產品</h2>
      <button type="button" class="btn" @click="getProduct(false)">
        <span class="material-symbols-outlined">add_circle</span>
      </button>
    </div>
  </div>

  <div class="table-responsive text-nowrap scrollBar-dark">
    <table class="table mt-4">
      <thead>
        <tr class="table-dark">
          <th>分類</th>
          <th>產品名稱</th>
          <th>
            <button
              class="btn p-0 m-0 text-light"
              type="button"
              @click="sortPrice('origin_price')"
            >
              原價<span class="material-symbols-outlined fs-6"> sort </span>
            </button>
          </th>
          <th>
            <button
              class="btn p-0 m-0 text-light"
              type="button"
              @click="sortPrice('price')"
            >
              售價<span class="material-symbols-outlined fs-6"> sort </span>
            </button>
          </th>
          <th>
            <button
              class="btn p-0 m-0 text-light"
              type="button"
              @click="sortNumber('is_enabled')"
            >
              是否啟動<span class="material-symbols-outlined fs-6"> sort </span>
            </button>
          </th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>NT${{ currency(item.origin_price) }}</td>
          <td>NT${{ currency(item.price) }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                name="isEnabled"
                id="flexSwitchCheckDefault"
                :checked="item.is_enabled"
                :true-value="1"
                :false-value="0"
                @change="updateEnabled(true, item)"
              />
              <label
                class="form-check-label pe-none"
                for="flexSwitchCheckDefault"
                >{{ item.is_enabled ? "啟動" : "未啟動" }}</label
              >
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary d-flex"
                @click="getProduct(true, item)"
              >
                <span class="material-symbols-outlined fs-6">edit</span>
              </button>
              <button
                type="button"
                class="btn btn-outline-danger d-flex"
                @click="removeProduct(item.id)"
              >
                <span class="material-symbols-outlined fs-6">delete</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="d-flex justify-content-center">
    <PageComponent :pagination="pagination" @page="getProducts" />
  </div>

  <ProductModal />
</template>

<script>
import { mapActions, mapState } from 'pinia'
import ProductModal from '@/components/ProductModal.vue'
import productStore from '@/stores/productStore'
import PageComponent from '@/components/PageComponent.vue'

export default {
  inject: ['currency'],
  components: {
    ProductModal,
    PageComponent
  },
  methods: {
    ...mapActions(productStore, [
      'getProducts',
      'sortPrice',
      'getProduct',
      'updateProduct',
      'removeProduct',
      'sortNumber',
      'updateEnabled'
    ])
  },
  computed: {
    ...mapState(productStore, ['products', 'pagination'])
  },
  async created () {
    await this.getProducts()
  }
}

</script>
