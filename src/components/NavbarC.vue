<template>
  <nav class="navbar fixed-top header bg-body">
    <div class="container px-12 px-lg-0">
      <!-- logo -->
      <a href="https://alice2317.github.io/Vue-week6/" target="_" class="navbar-brand text-primary ff-raleway m-0 p-0"
        >GW</a>

      <!-- menu -->
      <ul class="nav c-nav1">
        <li class="nav-item d-none d-lg-flex align-items-center">
          <router-link class="nav-link ls-sm text-uppercase" :to="{name:'products'}"
            >PRODUCT</router-link
          >
        </li>
        <li class="nav-item d-none d-lg-flex align-items-center">
          <router-link class="nav-link ls-sm text-uppercase" :to="{name:'posts'}"
            >POST</router-link
          >
        </li>
        <li class="nav-item d-none d-lg-flex align-items-center">
          <router-link class="nav-link ls-sm text-uppercase" :to="{name:'coupons'}"
            >COUPON</router-link
          >
        </li>
        <li class="nav-item d-none d-lg-flex align-items-center">
          <router-link class="nav-link ls-sm text-uppercase" :to="{name:'orders'}">ORDERS</router-link>
        </li>
        <li class="nav-item d-block d-lg-none">
          <button
            class="nav-link"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu"
          >
            <span class="material-symbols-outlined"> widgets </span>
          </button>
        </li>
        <li class="nav-item">
          <button type="button" class="nav-link" @click="logout">
            <span class="material-symbols-outlined"> logout </span>
          </button>
        </li>
      </ul>

      <!-- menu offcanvas -->
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        data-bs-scroll="true"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasMenuLabel">目錄</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav navbar-dark me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                class="nav-link"
                aria-current="page"
                :to="{name:'products'}"
                >PRODUCT</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name:'posts'}">POST</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name:'coupons'}">COUPON</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name:'orders'}">ORDERS</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import 'bootstrap/dist/js/bootstrap.bundle'
import { mapActions } from 'pinia'
import memberStore from '@/stores/memberStore'

export default {
  methods: {
    ...mapActions(memberStore, ['logout'])
  }
}
</script>
