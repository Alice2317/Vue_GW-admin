import { defineStore } from 'pinia'

export default defineStore('couponModalDefineStore', {
  state: () => ({
    isShow: false,
    tempCoupon: {},
    now: null
  }),
  actions: {
    today () {
      const year = new Date().getFullYear()
      const month = ('0' + (new Date().getMonth() + 1)).slice(-2)
      const day = ('0' + (new Date().getDate())).slice(-2)

      this.now = `${year}-${month}-${day}`
      return this.now
    }
  }
})
