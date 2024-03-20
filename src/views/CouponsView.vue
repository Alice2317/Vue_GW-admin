<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <h2>優惠卷</h2>
      <button type="button" class="btn" @click="getCoupon(false)">
        <span class="material-symbols-outlined">add_circle</span>
      </button>
    </div>
  </div>
  <div class="table-responsive text-nowrap scrollBar-dark">
    <table class="table mt-4">
      <thead>
        <tr class="table-dark">
          <th>標題</th>
          <th>優惠碼</th>
          <th>
            <button
              class="btn p-0 m-0 text-light"
              type="button"
              @click="sortNumber('percent')"
            >
              折扣百分比<span class="material-symbols-outlined fs-6">
                sort
              </span>
            </button>
          </th>
          <th>
            <button
              class="btn p-0 m-0 text-light"
              type="button"
              @click="sortNumber('due_date')"
            >
              到期日<span class="material-symbols-outlined fs-6"> sort </span>
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
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}%</td>
          <td>
            {{
              item.due_date === Number(item.due_date)
                ? date(item.due_date)
                : item.due_date
            }}
          </td>
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
              <label class="form-check-label pe-none" for="flexSwitchCheckDefault"
                >{{ item.is_enabled ? "啟動" : "未啟動"
                }}</label
              >
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary d-flex"
                @click="getCoupon(true, item)"
              >
                <span class="material-symbols-outlined fs-6">edit</span>
              </button>
              <button
                type="button"
                class="btn btn-outline-danger d-flex"
                @click="removeCoupon(item.id)"
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
    <PageComponent :pagination="pagination" @page="getCoupons" />
  </div>

  <CouponModal />
</template>

<script>
import { mapActions, mapState } from 'pinia'
import couponStore from '@/stores/couponStore'
import PageComponent from '@/components/PageComponent.vue'
import CouponModal from '@/components/CouponModal.vue'

export default {
  inject: ['date'],
  components: {
    PageComponent,
    CouponModal
  },
  methods: {
    ...mapActions(couponStore, [
      'getCoupons',
      'getCoupon',
      'updateEnabled',
      'removeCoupon',
      'sortNumber'
    ])
  },
  computed: {
    ...mapState(couponStore, ['coupons', 'pagination'])
  },
  async created () {
    await this.getCoupons()
  }
}
</script>
