<template>
    <v-app-bar
      color="primary"
      density="compact"
      elevation="4"
      class="d-flex flex-column"
    >
      <!-- Левая часть с 5 полями -->
      <div class="d-flex align-center">
        <v-text-field
          density="compact"
          variant="solo-filled"
          flat
          hide-details
          class="mr-2"
          style="max-width: 120px;"
        ></v-text-field>
        <v-text-field

            density="compact"
            variant="solo-filled"
            flat
            hide-details
            class="mr-2"
            style="max-width: 120px;"
        ></v-text-field>
      </div>
  
      <v-spacer></v-spacer>
  
      <!-- Правая часть с пользователем и кнопкой выхода -->
      <div class="d-flex align-center">
        <v-avatar
          color="secondary"
          size="36"
          class="mr-2"
        >
          <span class="text-caption">User</span>
        </v-avatar>
  
        <v-btn
          variant="text"
          color="white"
          prepend-icon="mdi-logout"
          size="small"
        >
          Выход
        </v-btn>
      </div>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: ''
  }
  </script>