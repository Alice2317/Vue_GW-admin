<template>
  <div class="d-flex justify-content-between align-items-end">
    <h2>訂單</h2>
    <div class="text-end">
      <p class="p-0">總 {{ orders.length }} 筆數</p>
    </div>
  </div>

  <div class="table-responsive text-nowrap scrollBar-dark">
    <table class="table mt-4">
      <thead>
        <tr class="table-dark">
          <th>
            <button
              class="btn p-0 m-0 text-light"
              type="button"
              @click="sortNumber('create_at')"
            >
              建立時間<span class="material-symbols-outlined fs-6"> sort </span>
            </button>
          </th>
          <th>姓名</th>
          <th>
            <button
              class="btn p-0 m-0 text-light"
              type="button"
              @click="sortNumber('total')"
            >
              金額<span class="material-symbols-outlined fs-6"> sort </span>
            </button>
          </th>
          <th>備註</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ date(item.create_at) }}</td>
          <td>{{ item.user.name }}</td>
          <td>NT${{ currency(item.total) }}</td>
          <td>{{ item.message === undefined ? "無" : item.message }}</td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary d-flex pe-none"
                :class="{ 'btn-secondary': item.is_paid }"
              >
                <span class="material-symbols-outlined fs-6">payments</span>
              </button>
              <a
                :href="`https://www.google.com/maps/place/${item.user.address}`"
                class="btn btn-outline-primary d-flex"
                target="_"
              >
                <span class="material-symbols-outlined fs-6">map</span>
              </a>
              <a
                :href="`tel:${item.user.tel}`"
                class="btn btn-outline-primary d-flex"
              >
                <span class="material-symbols-outlined fs-6">call</span>
              </a>
              <a
                :href="`mailto:${item.user.email}`"
                class="btn btn-outline-primary d-flex"
              >
                <span class="material-symbols-outlined fs-6">email</span>
              </a>
              <button
                type="button"
                class="btn btn-outline-primary d-flex"
                @click="getOrder(item)"
              >
                <span class="material-symbols-outlined fs-6">edit</span>
              </button>
              <button type="button" class="btn btn-outline-danger d-flex" @click="removeOrder(item.id)">
                <span class="material-symbols-outlined fs-6">delete</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="d-flex justify-content-center">
    <PageC :pagination="pagination" @page="getOrders" />
  </div>

  <OrderModal />
</template>

<script>
import { mapActions, mapState } from 'pinia'
import ordersStore from '@/stores/ordersStore'
import OrderModal from '@/components/OrderModal.vue'
import PageC from '@/components/PageC.vue'

export default {
  inject: ['date', 'currency'],
  components: {
    OrderModal,
    PageC
  },
  methods: {
    ...mapActions(ordersStore, ['getOrders', 'sortNumber', 'getOrder', 'removeOrder'])
  },
  computed: {
    ...mapState(ordersStore, ['orders', 'pagination'])
  },
  async created () {
    await this.getOrders()
  }
}
</script>
