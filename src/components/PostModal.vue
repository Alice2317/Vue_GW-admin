<template>
  <VForm @submit="updatePost">
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
                  貼文內容
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
          <div class="modal-body">
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
                      v-model="tempArticles.title"
                    />
                    <ErrorMessage class="text-danger" name="標題" />
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="author" class="form-label"
                        >作者<span class="text-danger">*</span></label
                      >
                      <VField
                        id="author"
                        name="作者"
                        type="text"
                        rules="required"
                        class="form-control"
                        placeholder="請輸入作者"
                        v-model="tempArticles.author"
                      />
                      <ErrorMessage class="text-danger" name="作者" />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="create_at" class="form-label"
                        >建立時間<span class="text-danger">*</span></label
                      >
                      <VField
                        id="create_at"
                        name="建立時間"
                        type="date"
                        rules="required"
                        class="form-control"
                        placeholder="請輸入建立時間"
                        v-model="tempArticles.create_at"
                      />
                      <ErrorMessage class="text-danger" name="建立時間" />
                    </div>
                  </div>

                  <div class="mb-3">
                    <p>標籤</p>
                    <div class="input-group mt-3">
                      <input
                        type="text"
                        name="tag"
                        id="tag"
                        class="form-control"
                        placeholder="請輸入標籤內容"
                        v-model="tempArticles.tagItem"
                      />
                      <button
                        class="btn btn-outline-dark"
                        type="button"
                        @click="addTag(tempArticles.tagItem)"
                      >
                        新增
                      </button>
                    </div>
                    <div class="d-flex overflow-auto">
                      <div
                        class="py-3 me-2"
                        v-for="(item, index) in tempArticles.tag"
                        :key="item.id"
                      >
                        <span
                          class="badge bg-primary d-flex justify-content-between align-items-center"
                        >
                          {{ item }}
                          <button
                            class="btn-close btn-close-white ms-2"
                            type="button"
                            @click="tempArticles.tag.splice(index, 1)"
                          ></button>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="description" class="form-label"
                      >貼文描述<span class="text-danger">*</span></label
                    >
                    <VField
                      as="textarea"
                      id="description"
                      type="text"
                      name="描述"
                      class="form-control"
                      rules="required"
                      placeholder="請輸入貼文描述"
                      v-model="tempArticles.description"
                    >
                    </VField>
                    <ErrorMessage class="text-danger" name="描述" />
                  </div>

                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        id="isPublic"
                        name="isPublic"
                        class="form-check-input"
                        type="checkbox"
                        v-model="tempArticles.isPublic"
                        :true-value="true"
                        :false-value="false"
                      />
                      <label class="form-check-label" for="isPublic"
                        >是否公開</label
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
                        id="image"
                        name="主圖"
                        rules="required"
                        placeholder="輸入主圖連結"
                        v-model="tempArticles.image"
                      />
                      <ErrorMessage class="text-danger" name="主圖" />
                    </div>
                  </div>
                  <img
                    class="img-fluid mt-3"
                    :src="tempArticles.image"
                    alt="主圖"
                    v-if="tempArticles.image"
                  />
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
import postModalStore from '@/stores/postModalStore'
import postsStore from '@/stores/postsStore'

export default {
  methods: {
    ...mapActions(postsStore, ['hideModal', 'updatePost']),
    ...mapActions(postModalStore, ['addTag', 'uploadImageUrl'])
  },
  computed: {
    ...mapState(postModalStore, ['isShow', 'tempArticles'])
  }
}
</script>
