<template>
  <VForm @submit="updateProduct">
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
                  商品內容
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
                  上傳圖片
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

          <div class="modal-body overflow-auto">
            <div class="container">
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div class="mb-3">
                    <label for="title" class="form-label"
                      >標題<span class="text-danger">*</span></label
                    >
                    <VField
                      id="title"
                      name="標題"
                      type="text"
                      class="form-control"
                      rules="required"
                      placeholder="請輸入標題"
                      v-model="tempProduct.title"
                    />
                    <ErrorMessage class="text-danger" name="標題" />
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="category" class="form-label"
                        >分類<span class="text-danger">*</span></label
                      >
                      <VField
                        id="category"
                        name="分類"
                        type="text"
                        class="form-control"
                        rules="required"
                        placeholder="請輸入分類"
                        v-model="tempProduct.category"
                      />
                      <ErrorMessage class="text-danger" name="分類" />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="unit" class="form-label"
                        >單位<span class="text-danger">*</span></label
                      >
                      <VField
                        id="unit"
                        name="單位"
                        type="text"
                        class="form-control"
                        placeholder="請輸入單位"
                        rules="required"
                        v-model="tempProduct.unit"
                      />
                      <ErrorMessage class="text-danger" name="單位" />
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="origin_price" class="form-label"
                        >原價<span class="text-danger">*</span></label
                      >
                      <VField
                        id="origin_price"
                        name="原價"
                        type="number"
                        min="0"
                        class="form-control"
                        rules="required|integer|min_value:1"
                        placeholder="請輸入原價"
                        v-model="tempProduct.origin_price"
                      />
                      <ErrorMessage class="text-danger" name="原價" />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label"
                        >售價<span class="text-danger">*</span></label
                      >
                      <VField
                        id="price"
                        name="售價"
                        type="number"
                        min="0"
                        class="form-control"
                        rules="required|integer|min_value:1"
                        placeholder="請輸入售價"
                        v-model="tempProduct.price"
                      />
                      <ErrorMessage class="text-danger" name="售價" />
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="description" class="form-label"
                      >產品描述<span class="text-danger">*</span></label
                    >
                    <VField
                      id="description"
                      type="text"
                      name="描述"
                      class="form-control"
                      rules="required"
                      as="textarea"
                      placeholder="請輸入產品描述"
                      v-model="tempProduct.description"
                    ></VField>
                    <ErrorMessage class="text-danger" name="描述" />
                  </div>
                  <div class="mb-3">
                    <label for="content" class="form-label"
                      >說明內容<span class="text-danger">*</span></label
                    >
                    <VField
                      id="content"
                      type="text"
                      name="內容"
                      class="form-control"
                      placeholder="請輸入說明內容"
                      as="textarea"
                      rules="required"
                      v-model="tempProduct.content"
                    >
                    </VField>
                    <ErrorMessage class="text-danger" name="內容" />
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        id="is_enabled"
                        name="is_enabled"
                        class="form-check-input"
                        type="checkbox"
                        v-model="tempProduct.is_enabled"
                        :true-value="1"
                        :false-value="0"
                      />
                      <label class="form-check-label" for="is_enabled"
                        >是否啟用</label
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
                  <p>主圖<span class="text-danger">*</span>:</p>
                  <div class="row">
                    <div class="col col-md-6">
                      <label class="btn btn-outline-dark w-100" for="fileInput">
                        上傳主圖
                        <input
                          type="file"
                          class="form-control d-none"
                          name="file-to-upload"
                          accept="image/png,image/jpeg,image/jpg"
                          id="fileInput"
                          placeholder="請上傳主圖"
                          @change="uploadImageUrl"
                        />
                      </label>
                    </div>
                    <div class="col col-md-6">
                      <VField
                        type="text"
                        class="form-control"
                        id="imageUrl"
                        name="主圖"
                        rules="required"
                        placeholder="輸入主圖連結"
                        v-model="tempProduct.imageUrl"
                      />
                      <ErrorMessage class="text-danger" name="主圖" />
                    </div>
                  </div>
                  <img
                    class="img-fluid mt-3"
                    :src="tempProduct.imageUrl"
                    alt="主圖"
                    v-if="tempProduct.imageUrl"
                  />

                  <div class="mt-5">
                    <p>縮圖:</p>
                    <div class="input-group mt-3">
                      <input
                        type="text"
                        name="imagesUrl"
                        id="imagesUrl"
                        class="form-control"
                        placeholder="請輸入縮圖連結"
                        v-model="tempProduct.image"
                      />
                      <button
                        class="btn btn-outline-dark"
                        type="button"
                        @click="addImagesUrl(tempProduct.image)"
                      >
                        新增
                      </button>
                    </div>
                    <div class="d-flex overflow-auto">
                      <div
                        class="py-3 me-2"
                        v-for="(item, index) in tempProduct.imagesUrl"
                        :key="item.id"
                      >
                        <div class="card bg-dark text-white rounded-0 border-0">
                          <img
                            class="card-image"
                            width="150"
                            :src="item"
                            alt="縮圖"
                          />
                          <div class="card-img-overlay text-end">
                            <button
                              type="button"
                              class="btn-close bg-white position-absolute top-0 end-0"
                              aria-label="Close"
                              @click="tempProduct.imagesUrl.splice(index, 1)"
                            ></button>
                          </div>
                        </div>
                      </div>
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
import productModal from '@/stores/productModalStore'
import productStore from '@/stores/productStore'

export default {
  methods: {
    ...mapActions(productModal, ['uploadImageUrl', 'addImagesUrl']),
    ...mapActions(productStore, ['hideModal', 'updateProduct'])
  },
  computed: {
    ...mapState(productModal, ['isShow', 'tempProduct'])
  }
}
</script>
