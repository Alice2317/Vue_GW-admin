import { defineStore } from 'pinia'
import axios from 'axios'

export default defineStore('productModalDefineStore', {
  state: () => ({
    isShow: false,
    tempProduct: {}
  }),
  actions: {
    addImagesUrl (val) {
      if (val === null) {
        this.toast('error', '請填寫圖片連結')
      } else {
        this.tempProduct.imagesUrl.push(val)
      }
    },
    uploadImageUrl () {
      const fileData = new FormData()
      const fileInput = document.querySelector('#fileInput').files[0]
      fileData.append('file-to-upload', fileInput)

      const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/${import.meta.env.VITE_MAIN_NAME}/admin/upload`
      axios.post(api, fileData)
        .then((res) => {
          if (res.status === 200) {
            this.tempProduct.imageUrl = res.data.imageUrl
            this.toast('success', '上傳成功')
          }
        })
        .catch(error => {
          this.toast('error', '上傳失敗')
          console.error('api-uploadImageUrl error', error)
        })
    }
  }
})
