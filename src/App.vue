<script setup>
import MainNavBar from './components/components/MainNavBar.vue'
</script>

<template>
  <div class="app-layout">
    <MainNavBar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: #f8fafc;
}
.main-content {
  max-width: 900px;
  margin: 40px auto 0 auto;
  padding: 32px 16px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(80, 80, 180, 0.08);
}
</style>
