import { defineStore } from 'pinia'
import axios from 'axios'
import loading from './loadingStore'
import Modal from './orderModalStore'

const modal = Modal()
const status = loading()

export default defineStore('ordersDefineStore', {
  state: () => ({
    orders: [],
    pagination: {},
    order: {}
  }),
  actions: {
    getOrders (page = 1) {
      status.isLoading = true
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME
        }/admin/orders?page=${page}`
      axios
        .get(api)
        .then((res) => {
          status.isLoading = false
          if (res.data.success) {
            this.orders = res.data.orders
            this.pagination = res.data.pagination
          } else {
            this.toast('error', '請重新登入')
          }
        })
        .catch(error => console.error('api-getOrders error', error))
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    sortNumber (sort) {
      this.orders.sort((a, b) => a[sort] > b[sort] ? 1 : -1)
    },
    getOrder (item) {
      modal.isShow = true
      this.order = item
      modal.tempProduct = { ...item }
      modal.productsId = this.orders.filter((item) => item.id === modal.tempProduct.id)
      modal.productsId = modal.productsId[0].products
    },
    hideModal () {
      modal.isShow = false
    },
    updateOrder () {
      status.isLoading = true
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME}/admin/order/${modal.tempProduct.id}`

      delete modal.tempProduct.id

      axios.put(api, { data: modal.tempProduct })
        .then((res) => {
          status.isLoading = false
          if (res.data.success) {
            this.toast('success', '上傳成功')
            this.getOrders()
            status.isLoading = false
            modal.isShow = false
          } else {
            this.toast('error', '上傳失敗')
          }
        })
        .catch(error => console.error('api-updateOrder error', error))
    },
    removeOrder (id) {
      const api = `${import.meta.env.VITE_MAIN_URL}api/${import.meta.env.VITE_MAIN_NAME}/admin/order/${id}`

      this.alert().then((result) => {
        if (result.isConfirmed) {
          status.isLoading = true
          axios.delete(api).then((res) => {
            status.isLoading = false
            if (res.data.success) {
              this.toast('success', '刪除成功')
              this.getOrders()
            } else {
              this.toast('error', '刪除失敗')
            }
          })
            .catch(error => console.error('api-removeOrder error', error))
        }
      })
    },
    removeAllOrder () {
      const api = `${import.meta.env.VITE_MAIN_URL}api/${import.meta.env.VITE_MAIN_NAME}/admin/orders/all`

      this.alert().then((result) => {
        if (result.isConfirmed) {
          status.isLoading = true
          axios.delete(api).then((res) => {
            status.isLoading = false
            if (res.data.success) {
              this.toast('success', '刪除成功')
              this.getOrders()
            } else {
              this.toast('error', '刪除失敗')
            }
          })
            .catch(error => console.error('api-removeOrder error', error))
        }
      })
    }
  }
})
