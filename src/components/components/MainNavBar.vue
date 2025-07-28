<template>
  <v-app-bar
    color="primary"
    density="compact"
    elevation="11"
    class="d-flex align-center px-6"
    height="80"
  >
    <!-- Левая часть с названием системы -->
    <div class="d-flex align-center justify-center" style="height: 100%;">
      <v-icon class="mr-5" color="white" size="38">mdi-clipboard-list</v-icon>
      <span style="font-size: 2rem; font-weight: 700; color: #fff; letter-spacing: 1px;">
        Учет материальных средств отдела
      </span>
    </div>

    <v-spacer></v-spacer>

    <!-- Правая часть с пользователем и кнопкой выхода -->
    <div class="d-flex align-center justify-center" style="height: 100%;">
      <v-chip
        color="secondary"
        variant="elevated"
        class="mr-4"
        size="large"
        style="height: 48px; font-size: 1.1rem; align-items: center;"
      >
        <v-icon start size="28">mdi-account</v-icon>
        Администратор
      </v-chip>
      <v-btn
        variant="elevated"
        color="white"
        prepend-icon="mdi-logout"
        size="large"
        style="height: 48px; color: #1976d2; font-weight: 600;"
        class="text-caption"
      >
        Выход
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'MainNavBar'
}
</script>