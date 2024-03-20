<template>
  <VLoading :active="isLoading" :is-full-page="true">
    <div class="loading-box">
      <h1 class="ff-serif loading-text m-0">GW</h1>
    </div>
  </VLoading>
</template>

<script>
import { mapState } from 'pinia'
import loadingStore from '@/stores/loadingStore'

export default {
  computed: {
    ...mapState(loadingStore, ['isLoading'])
  }
}
</script>
