import { defineStore } from 'pinia'
import axios from 'axios'

export default defineStore('postModalDefineStore', {
  state: () => ({
    isShow: false,
    tempArticles: { }
  }),
  actions: {
    addTag (val) {
      if (val === null) {
        this.toast('error', '請填寫標籤內容')
      } else {
        this.tempArticles.tag.push(val)
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
            this.tempArticles.image = res.data.imageUrl
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
