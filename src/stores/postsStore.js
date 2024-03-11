import { defineStore } from 'pinia'
import axios from 'axios'
import loading from './loadingStore'
import Modal from './postModalStore'
import { date, dateUnix } from '../js/filter'

const modal = Modal()
const status = loading()

export default defineStore('postsDefineStore', {
  state: () => ({
    articles: [],
    pagination: {},
    sort: [],
    isEdit: false
  }),
  actions: {
    getPosts (page = 1) {
      status.isLoading = true
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
            import.meta.env.VITE_MAIN_NAME
          }/admin/articles?page=${page}`
      axios.get(api).then((res) => {
        status.isLoading = false
        if (res.data.success) {
          this.articles = res.data.articles
          this.pagination = res.data.pagination
        } else {
          this.toast('error', '請重新登入')
        }
      })
        .catch(() => this.toast('error', '資料取得失敗，請重新登入'))
    },
    sortNumber (sort) {
      this.articles.sort((a, b) => a[sort] > b[sort] ? 1 : -1)
    },
    hideModal () {
      modal.isShow = false
    },
    getPost (boolean, item) {
      modal.isShow = true
      this.isEdit = boolean
      if (this.isEdit) {
        modal.tempArticles = { ...item }
        modal.tempArticles.create_at = date(modal.tempArticles.create_at)
        if (modal.tempArticles.tag === undefined) {
          modal.tempArticles.tag = []
        }
      } else {
        modal.tempArticles = {
          tag: [],
          isPublic: false,
          tagItem: ''
        }
      }
    },
    updatePost () {
      status.isLoading = true

      let apiMethod = 'post'
      let api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME}/admin/article`
      if (this.isEdit === true) {
        apiMethod = 'put'
        api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME}/admin/article/${modal.tempArticles.id}`
      }

      modal.tempArticles.content = '無'
      delete modal.tempArticles.tagItem

      const data = { ...modal.tempArticles }

      data.create_at = dateUnix(data.create_at)

      axios[apiMethod](api, { data })
        .then((res) => {
          status.isLoading = false
          if (res.data.success) {
            this.toast('success', '上傳成功')
            modal.isShow = false
            this.getPosts()
          } else {
            this.toast('error', '上傳失敗')
          }
        })
        .catch(() => this.toast('error', '上傳失敗'))
    },
    updateEnabled (boolean, item) {
      this.isEdit = boolean
      modal.tempArticles = { ...item }

      modal.tempArticles.create_at = date(modal.tempArticles.create_at)
      this.updatePost()
    },
    removePost (id) {
      status.isLoading = true
      const api = `${import.meta.env.VITE_MAIN_URL}api/${import.meta.env.VITE_MAIN_NAME}/admin/article/${id}`

      this.alert().then((result) => {
        if (result.isConfirmed) {
          axios.delete(api).then((res) => {
            status.isLoading = false
            if (res.data.success) {
              this.toast('success', '刪除成功')
              this.getPosts()
            } else {
              this.toast('error', '刪除失敗')
            }
          })
            .catch(() => this.toast('error', '刪除失敗'))
        }
      })
    }
  }
})
