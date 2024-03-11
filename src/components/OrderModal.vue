<template>
  <VForm @submit="updateOrder">
    <div class="modal" tabindex="-1" :class="{ 'd-block': isShow }">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <ul class="nav nav-pills" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  訂單內容
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  商品內容
                </button>
              </li>
            </ul>
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
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="name" class="form-label"
                        >姓名<span class="text-danger">*</span></label
                      >
                      <VField
                        id="name"
                        name="姓名"
                        type="text"
                        rules="required"
                        class="form-control"
                        placeholder="請輸入收件者姓名"
                        v-model="tempProduct.user.name"
                      />

                      <ErrorMessage class="text-danger" name="姓名" />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="phone" class="form-label"
                        >電話<span class="text-danger">*</span></label
                      >
                      <VField
                        id="phone"
                        name="電話"
                        type="text"
                        :rules="isPhone"
                        class="form-control"
                        placeholder="請輸入收件者電話"
                        v-model="tempProduct.user.tel"
                      />

                      <ErrorMessage class="text-danger" name="電話" />
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="email" class="form-label"
                        >EMAIL<span class="text-danger">*</span></label
                      >
                      <VField
                        id="email"
                        name="email"
                        type="text"
                        rules="required|email"
                        class="form-control"
                        placeholder="請輸入收件者EMAIL"
                        v-model="tempProduct.user.email"
                      />

                      <ErrorMessage class="text-danger" name="email" />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="create_at" class="form-label"
                        >建立時間<span class="text-danger">*</span></label
                      >
                      <input
                        id="create_at"
                        name="create_at"
                        type="date"
                        class="form-control opacity-50"
                        :value="date(tempProduct.create_at)"
                        disabled
                      />
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="address" class="form-label"
                      >地址<span class="text-danger">*</span></label
                    >
                    <VField
                      id="address"
                      name="地址"
                      type="text"
                      rules="required"
                      class="form-control"
                      placeholder="請輸入收件者地址"
                      v-model="tempProduct.user.address"
                    />
                    <ErrorMessage class="text-danger" name="地址" />
                  </div>

                  <div class="mb-3">
                    <label for="message" class="form-label">留言</label>
                    <textarea
                      id="message"
                      type="text"
                      name="message"
                      class="form-control"
                      placeholder="請輸入想對廠商說的話"
                      v-model="tempProduct.message"
                    >
                    </textarea>
                  </div>

                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        id="is_enabled"
                        name="is_enabled"
                        class="form-check-input"
                        type="checkbox"
                        v-model="tempProduct.is_paid"
                        :true-value="true"
                        :false-value="false"
                      />
                      <label class="form-check-label" for="is_enabled"
                        >是否已付款</label
                      >
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                >
                  <div
                    class="row row-cols-1 row-cols-lg-2 py-3"
                    v-for="item in productsId"
                    :key="item.id"
                  >
                    <div class="col">
                      <img
                        class="img-fluid mt-3"
                        :src="item.product.imageUrl"
                        alt="主圖"
                      />
                    </div>
                    <div class="col">
                      <h5 class="pt-4 pt-lg-0">{{ item.product.title }}</h5>
                      <p>{{ item.qty }} X NT${{ item.product.price }}</p>
                      <p v-html="item.product.content"></p>
                      <p v-html="item.product.description"></p>
                    </div>
                  </div>
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
import orderModal from '@/stores/orderModalStore'
import ordersStore from '@/stores/ordersStore'

export default {
  inject: ['date'],
  methods: {
    ...mapActions(ordersStore, ['hideModal', 'updateOrder', 'isPhone'])
  },
  computed: {
    ...mapState(orderModal, ['isShow', 'tempProduct', 'productsId'])
  }
}
</script>
