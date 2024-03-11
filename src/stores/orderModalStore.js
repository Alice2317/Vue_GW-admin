import { defineStore } from 'pinia'

export default defineStore('orderModalDefineStore', {
  state: () => ({
    isShow: false,
    tempProduct: {
      user: {},
      products: {}
    },
    productsId: []
  })
})
