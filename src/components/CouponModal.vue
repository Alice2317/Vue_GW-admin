<template>
  <VForm @submit="updateCoupon" v-if="isShow">
    <div class="modal d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">優惠碼</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="hideModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="title" class="form-label"
                    >標題<span class="text-danger">*</span></label
                  >
                  <VField
                    id="title"
                    name="標題"
                    type="text"
                    rules="required"
                    class="form-control"
                    placeholder="請輸入標題"
                    v-model="tempCoupon.title"
                  />

                  <ErrorMessage class="text-danger" name="標題" />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="code" class="form-label"
                    >優惠碼<span class="text-danger">*</span></label
                  >
                  <VField
                    id="code"
                    name="優惠碼"
                    type="text"
                    rules="required"
                    class="form-control"
                    placeholder="請輸入優惠碼"
                    v-model="tempCoupon.code"
                  />
                  <ErrorMessage class="text-danger" name="優惠碼" />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="percent" class="form-label"
                    >折扣百分比<span class="text-danger">*</span></label
                  >
                  <VField
                    id="percent"
                    name="折扣百分比"
                    type="number"
                    rules="required|integer|between:10,100"
                    min="1"
                    max="100"
                    class="form-control"
                    placeholder="請輸入折扣百分比"
                    v-model="tempCoupon.percent"
                  />
                  <ErrorMessage class="text-danger" name="折扣百分比" />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="due_date" class="form-label"
                    >到期日<span class="text-danger">*</span></label
                  >
                  <VField
                    id="due_date"
                    name="到期日"
                    type="date"
                    rules="required"
                    class="form-control"
                    :min="now"
                    placeholder="請輸入到期日"
                    v-model="tempCoupon.due_date"
                  />
                  <ErrorMessage class="text-danger" name="到期日" />
                </div>
              </div>

              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    name="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempCoupon.is_enabled"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 p-0">
            <button
              type="submit"
              class="btn btn-primary border-0 border-top w-100 m-0"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </VForm>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import couponModal from '@/stores/couponModalStore'
import couponStore from '@/stores/couponStore'

export default {
  methods: {
    ...mapActions(couponStore, ['hideModal', 'updateCoupon']),
    ...mapActions(couponModal, ['today'])
  },
  computed: {
    ...mapState(couponModal, ['isShow', 'tempCoupon', 'now'])
  },
  async created () {
    await this.today()
  }
}
</script>
