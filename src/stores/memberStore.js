import { defineStore } from 'pinia'
import axios from 'axios'
import loading from './loadingStore'
const status = loading()

export default defineStore('memberDefineStore', {
  state: () => ({
    user: {
      username: '',
      password: ''
    }
  }),
  actions: {
    isPassword () {
      const Password = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
      return Password.test(this.user.password) ? true : '輸入錯誤'
    },
    showPwd () {
      const eye = document.querySelector('.eye')
      const pwd = document.querySelector('.pwd input')
      if (eye.textContent === 'visibility') {
        eye.textContent = 'visibility_off'
        pwd.setAttribute('type', 'text')
      } else {
        eye.textContent = 'visibility'
        pwd.setAttribute('type', 'password')
      }
    },
    signIn () {
      status.isLoading = true
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/admin/signin`
      axios.post(api, this.user).then((res) => {
        status.isLoading = false
        if (res.data.success) {
          document.cookie = `token=${res.data.token}; expires=${new Date(
            res.data.expired
          )};`
          this.router.replace({ name: 'products' })

          setTimeout(() => {
            this.user = {
              username: '',
              password: ''
            }
          }, 1000)
        } else {
          this.toast('error', '失敗，請重新登入')
        }
      }).catch(error => {
        status.isLoading = false
        this.toast('error', '失敗，請重新登入')
        console.error('api-signIn error', error)
      })
    },
    logout () {
      status.isLoading = true
      const api = `${import.meta.env.VITE_MAIN_URL}/v2/logout`
      axios.post(api).then((res) => {
        status.isLoading = false
        if (res.data.success) {
          this.router.replace('/')
          const date = new Date()
          date.setMinutes(date.getMinutes() - 480).toLocaleString()
          document.cookie = `token=; expires=${date}`
        } else {
          this.toast('error', '失敗，請重新整理後再次操作')
        }
      })
        .catch(error => {
          status.isLoading = false
          this.toast('error', '失敗，請重新整理後再次操作')
          console.error('api-logout error', error)
        })
    }
  }
})
