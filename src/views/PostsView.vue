<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <h2>貼文</h2>
      <button type="button" class="btn" @click="getPost(false)">
        <span class="material-symbols-outlined">add_circle</span>
      </button>
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
              建立日期<span class="material-symbols-outlined fs-6"> sort </span>
            </button>
          </th>
          <th>標籤</th>
          <th>圖片</th>
          <th>標題</th>
          <th>作者</th>
          <th>描述</th>
          <th>
            <button
              class="btn p-0 m-0 text-light"
              type="button"
              @click="sortNumber('isPublic')"
            >
              是否公開<span class="material-symbols-outlined fs-6"> sort </span>
            </button>
          </th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in articles" :key="item.id">
          <td>
            {{
              item.create_at === Number(item.create_at)
                ? date(item.create_at)
                : item.create_at
            }}
          </td>
          <td>{{ item.tag === undefined ? '' : String(item.tag)}}</td>
          <td>
            <img class="img-fluid" :src="item.image" width="150" alt="主圖" />
          </td>
          <td>
            <div class="text-truncate max-width-100">
              {{ item.title }}
            </div>
          </td>
          <td>{{ item.author }}</td>
          <td>
            <div class="text-truncate max-width-200" v-html="item.description">
            </div>
          </td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                name="isEnabled"
                id="flexSwitchCheckDefault"
                v-model="item.isPublic"
                :true-value="true"
                :false-value="false"
                @change="updateEnabled(true, item)"
              />
              <label class="form-check-label pe-none" for="flexSwitchCheckDefault">{{
                item.isPublic ? "公開" : "不公開"
              }}</label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary d-flex"
                @click="getPost(true, item)"
              >
                <span class="material-symbols-outlined fs-6">edit</span>
              </button>
              <button
                type="button"
                class="btn btn-outline-danger d-flex"
                @click="removePost(item.id)"
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
    <PageComponent :pagination="pagination" @page="getPosts" />
  </div>

  <PostModal />
</template>

<script>
import { mapActions, mapState } from 'pinia'
import postsStore from '@/stores/postsStore'
import PostModal from '@/components/PostModal.vue'
import PageComponent from '@/components/PageComponent.vue'

export default {
  inject: ['date'],
  components: {
    PostModal,
    PageComponent
  },
  methods: {
    ...mapActions(postsStore, [
      'getPosts',
      'sortNumber',
      'getPost',
      'updateEnabled',
      'removePost'
    ])
  },
  computed: {
    ...mapState(postsStore, ['articles', 'pagination'])
  },
  async created () {
    await this.getPosts()
  }
}
</script>
