<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-6 mb-6 elevation-3">
          <v-card-title class="text-h4 text-primary mb-2">Учёт материальных средств</v-card-title>
          <v-card-text class="text-body-1 mb-4">
            Добро пожаловать в систему учёта материальных средств на объекте!
          </v-card-text>
        </v-card>
        <v-card class="pa-4 elevation-2">
          <v-card-title class="text-h6">Таблица учёта</v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            hide-default-footer
          >
            <template #item.index="{ index }">
              {{ index + 1 }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const headers = [
  { text: '№', value: 'index', width: 60 },
  { text: 'Наименование', value: 'name' },
  { text: 'Количество', value: 'quantity' },
  { text: 'Ед. изм.', value: 'unit' },
  { text: 'Местоположение', value: 'location' },
]

const items = ref([
  { name: 'Кабель ВВГнг 3x2.5', quantity: 120, unit: 'м', location: 'Склад 1' },
  { name: 'Труба ПНД 25мм', quantity: 50, unit: 'м', location: 'Участок 2' },
  { name: 'Щит распределительный', quantity: 3, unit: 'шт', location: 'Склад 2' },
])
</script> 