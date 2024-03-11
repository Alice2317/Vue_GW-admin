import { defineStore } from 'pinia'
import axios from 'axios'
import loading from './loadingStore'
import Modal from './couponModalStore'
import { date, dateUnix } from '../js/filter'

const modal = Modal()
const status = loading()

export default defineStore('couponsDefineStore', {
  state: () => ({
    coupons: [],
    coupon: {},
    pagination: {},
    isNew: false
  }),
  actions: {
    getCoupons (page = 1) {
      status.isLoading = true
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${
        import.meta.env.VITE_MAIN_NAME
      }/admin/coupons?page=${page}`
      axios.get(api).then((res) => {
        if (res.data.success) {
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
          status.isLoading = false
        } else {
          this.toast('error', '請重新登入')
        }
      })
        .catch(() => this.toast('error', '資料取得失敗，請重新登入'))
    },
    sortNumber (sort) {
      this.coupons.sort((a, b) => a[sort] > b[sort] ? 1 : -1)
    },
    getCoupon (boolean, item) {
      this.isNew = boolean
      if (this.isNew) {
        modal.tempCoupon = { ...item }
        modal.tempCoupon.due_date = date(modal.tempCoupon.due_date)
      } else {
        modal.tempCoupon = { percent: 100, is_enabled: 0 }
      }
      modal.isShow = true
    },
    hideModal () {
      modal.isShow = false
    },
    updateCoupon () {
      status.isLoading = true
      let api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME}/admin/coupon`
      let httpMethod = 'post'

      if (this.isNew === true) {
        httpMethod = 'put'
        api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME}/admin/coupon/${modal.tempCoupon.id}`
      }

      const data = { ...modal.tempCoupon }

      data.due_date = dateUnix(data.due_date)

      axios[httpMethod](api, { data }).then((res) => {
        status.isLoading = false
        if (res.data.success) {
          this.toast('success', '上傳成功')
          this.getCoupons()
          modal.isShow = false
        } else {
          this.toast('error', '上傳失敗')
        }
      })
        .catch(() => this.toast('error', '上傳失敗'))
    },
    updateEnabled (boolean, item) {
      this.isNew = boolean
      if (item.is_enabled === 1) {
        item.is_enabled = 0
      } else {
        item.is_enabled = 1
      }
      modal.tempCoupon = { ...item }

      modal.tempCoupon.due_date = date(modal.tempCoupon.due_date)
      this.updateCoupon()
    },
    removeCoupon (id) {
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME}/admin/coupon/${id}`
      this.alert().then((result) => {
        if (result.isConfirmed) {
          status.isLoading = true
          axios.delete(api).then((res) => {
            status.isLoading = false
            if (res.data.success) {
              this.toast('success', '刪除成功')
              this.getCoupons()
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
