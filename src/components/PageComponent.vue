<template>
  <ul class="pagination justify-content-center py-3">
    <li class="page-item mx-1" :class="pagination.has_pre ? 'd-block' : 'd-none'">
      <button
        class="page-link rounded-circle"
        type="button"
        aria-label="Previous"
        @click="$emit('page', pagination.current_page - 1)"
      >
        <span aria-hidden="true">&laquo;</span>
      </button>
    </li>
    <li
      class="page-item mx-1"
      :class="pagination.current_page === item ? 'active' : ''"
      v-for="item in pagination.total_pages"
      :key="'page' + item"
    >
      <button class="page-link rounded-circle" type="button" @click="$emit('page', item)">{{ item }}</button>
    </li>

    <li class="page-item mx-1" :class="pagination.has_next ? 'd-block' : 'd-none'">
      <button
        class="page-link rounded-circle"
        type="button"
        aria-label="Next"
        @click="$emit('page', pagination.current_page + 1)"
      >
        <span aria-hidden="true">&raquo;</span>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      default () {
        return {
          has_next: false,
          current_page: 1,
          total_pages: 1,
          has_pre: false
        }
      }
    }
  },
  emits: ['page']
}
</script>
