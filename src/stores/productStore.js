import { defineStore } from 'pinia'
import axios from 'axios'
import Modal from './productModalStore'
import loading from './loadingStore'

const modal = Modal()
const status = loading()

export default defineStore('productsDefineStore', {
  state: () => ({
    products: [],
    pagination: {},
    sort: [],
    isEdit: false
  }),
  actions: {
    getProducts (page = 1) {
      status.isLoading = true
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/admin/products?page=${page}`
      axios.get(api)
        .then((res) => {
          status.isLoading = false
          if (res.data.success) {
            this.products = res.data.products
            this.pagination = res.data.pagination
          } else {
            this.toast('error', '請重新登入')
          }
        })
        .catch(error => {
          status.isLoading = false
          this.toast('error', '請重新登入')
          console.error('api-getProducts error', error)
        })
    },
    sortNumber (sort) {
      this.products.sort((a, b) => a[sort] > b[sort] ? 1 : -1)
    },
    sortPrice (sort) {
      this.products.sort((a, b) => a[sort] - b[sort])
    },
    hideModal () {
      modal.isShow = false
    },
    getProduct (boolean, item) {
      modal.isShow = true
      this.isEdit = boolean
      if (this.isEdit) {
        modal.tempProduct = { ...item }
        if (modal.tempProduct.imagesUrl === undefined) {
          modal.tempProduct.imagesUrl = []
        }
      } else {
        modal.tempProduct = {
          imagesUrl: [],
          is_enabled: 0,
          image: ''
        }
      }
    },
    updateProduct () {
      status.isLoading = true
      let apiMethod = 'post'
      let api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME}/admin/product`
      if (this.isEdit === true) {
        apiMethod = 'put'
        api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME}/admin/product/${modal.tempProduct.id}`
      }

      delete modal.tempProduct.image

      axios[apiMethod](api, { data: modal.tempProduct })
        .then((res) => {
          status.isLoading = false
          if (res.data.success) {
            this.toast('success', '上傳成功')
            modal.isShow = false
            this.getProducts()
          } else {
            this.toast('error', '上傳失敗')
          }
        })
        .catch(error => {
          status.isLoading = false
          this.toast('error', '上傳失敗')
          console.error('api-updateProduct error', error)
        })
    },
    updateEnabled (boolean, item) {
      this.isEdit = boolean
      if (item.is_enabled === 1) {
        item.is_enabled = 0
      } else {
        item.is_enabled = 1
      }

      modal.tempProduct = { ...item }
      this.updateProduct()
    },
    removeProduct (id) {
      const api = `${import.meta.env.VITE_MAIN_URL}api/${import.meta.env.VITE_MAIN_NAME}/admin/product/${id}`

      this.alert().then((result) => {
        if (result.isConfirmed) {
          status.isLoading = true
          axios.delete(api).then((res) => {
            status.isLoading = false
            if (res.data.success) {
              this.toast('success', '刪除成功')
              this.getProducts()
            } else {
              this.toast('error', '刪除失敗')
            }
          })
            .catch(error => {
              status.isLoading = false
              this.toast('error', '刪除失敗')
              console.error('api-removeProduct error', error)
            })
        }
      })
    }
  }
})
