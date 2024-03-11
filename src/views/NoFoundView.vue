<template>
  <h1>404</h1>
  <p>找不到頁面，正在跳轉至首頁</p>
</template>

<script>
export default {
  mounted () {
    setTimeout(() => this.$router.push('/'), 3000)
  }
}
</script>
