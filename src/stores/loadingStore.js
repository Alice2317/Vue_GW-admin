import { defineStore } from 'pinia'

export default defineStore('statusLoadingDefineStore', {
  state: () => ({
    isLoading: false
  })
})
