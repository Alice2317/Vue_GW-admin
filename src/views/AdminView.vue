<template>
  <NavbarComponent />
  <main class="has-header-layout">
    <div class="container py-80">
      <RouterView />
    </div>
  </main>
  <LoadingComponent />
</template>

<script>
import { currency, date, dateUnix } from '@/js/filter'
import NavbarComponent from '@/components/NavbarComponent.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'

export default {
  provide () {
    return {
      currency, date, dateUnix
    }
  },
  components: {
    NavbarComponent,
    LoadingComponent
  },
  created () {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )

    this.axios.defaults.headers.common.Authorization = token

    const api = `${import.meta.env.VITE_MAIN_URL}/v2/api/user/check`

    this.axios.post(api)
      .then((res) => {
        if (res.data.success) {
          return ''
        } else {
          this.$router.replace({ name: 'login' })
        }
      })
      .catch(error => console.error('api-check error', error))
  }
}
</script>
