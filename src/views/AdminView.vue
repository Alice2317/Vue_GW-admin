<template>
  <NavbarC />
  <main class="has-header-layout">
    <div class="container py-80">
      <router-view></router-view>
    </div>
  </main>
  <LoadingC />
</template>

<script>
import { currency, date, dateUnix } from '@/js/filter'
import NavbarC from '@/components/NavbarC.vue'
import LoadingC from '@/components/LoadingC.vue'

export default {
  provide () {
    return {
      currency, date, dateUnix
    }
  },
  components: {
    NavbarC,
    LoadingC
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
  }
}
</script>
