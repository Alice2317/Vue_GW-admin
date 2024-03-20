<template>
  <HeaderComponent />
  <main class="has-header-layout">
    <div class="container py-80">
      <div class="row">
        <div class="col-12 col-md-3 col-lg-4"></div>
        <div class="col-12 col-md-6 col-lg-4">
          <h2 class="ff-serif 1h-lg ls-md fw-bold py-40 text-center">
            會員登入
          </h2>
          <VForm @submit="signIn" class="text-start">
            <label for="userEmail" class="form-label">帳號</label>
            <div class="pb-4">
              <VField
                id="userEmail"
                name="email"
                type="email"
                class="form-control"
                placeholder="請輸入EMAIL"
                rules="required|email"
                v-model="user.username"
              >
              </VField>
              <ErrorMessage class="text-danger" name="email" />
            </div>
            <label for="password" class="form-label">密碼</label>
            <div class="pb-4 pwd">
              <VField
                id="password"
                name="password"
                type="password"
                class="form-control"
                placeholder="請輸入password"
                :rules="isPassword"
                v-model="user.password"
              >
              </VField>
              <span class="material-symbols-outlined eye fs-6" @click="showPwd"> visibility </span>
              <ErrorMessage class="text-danger" name="password" />
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-secondary">確認</button>
            </div>
          </VForm>
        </div>
        <div class="col-12 col-md-3 col-lg-4"></div>
      </div>
    </div>
  </main>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import { mapActions, mapState } from 'pinia'
import memberStore from '@/stores/memberStore'

export default {
  components: {
    HeaderComponent
  },
  methods: {
    ...mapActions(memberStore, ['signIn', 'isPassword', 'showPwd'])
  },
  computed: {
    ...mapState(memberStore, ['user'])
  }
}
</script>
