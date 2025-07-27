<template>
  <nav class="navbar">
    <div class="navbar-logo">VueApp</div>
    <ul class="navbar-links">
      <li><router-link to="/" exact-active-class="active">Главная</router-link></li>
      <li><router-link to="/about" exact-active-class="active">О нас</router-link></li>
      <li><router-link to="/services" exact-active-class="active">Услуги</router-link></li>
      <li><router-link to="/contact" exact-active-class="active">Контакты</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 64px;
  background: linear-gradient(90deg, #6366f1 0%, #3b3b98 100%);
  box-shadow: 0 2px 12px rgba(99, 102, 241, 0.07);
}
.navbar-logo {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
}
.navbar-links {
  display: flex;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.navbar-links li {
  font-size: 1.1rem;
}
.navbar-links a {
  color: #e0e7ff;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}
.navbar-links a.active,
.navbar-links a:hover {
  background: #fff;
  color: #3b3b98;
}
</style>