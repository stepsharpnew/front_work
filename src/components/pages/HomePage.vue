<template>
  <v-container fluid>
    <v-row class="mb-4">
      <v-col cols="auto">
        <v-btn color="primary" @click="addEquipment">Добавить оборудование</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" variant="outlined" @click="backupEquipment">Создать резервную копию оборудования</v-btn>
      </v-col>
    </v-row>
    <v-row class="mb-2">
      <v-col cols="2">
        <v-text-field label="Поиск (Инв., Зав., Акт)" dense hide-details></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field label="Наименование оборуд." dense hide-details></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-select :items="['1 отделение', '2 отделение']" label="Подразделение" dense hide-details></v-select>
      </v-col>
      <v-col cols="2">
        <v-select :items="['2022', '2023', '2024']" label="Год" dense hide-details></v-select>
      </v-col>
      <v-col cols="2">
        <v-select :items="['Тип 1', 'Тип 2']" label="Тип" dense hide-details></v-select>
      </v-col>
      <v-col cols="1" class="d-flex align-center">
        <v-btn variant="text" color="primary" @click="resetFilters">Сброс</v-btn>
      </v-col>
    </v-row>
    <v-card class="mb-4">
      <v-card-text class="pa-3">
        <v-row class="text-center font-weight-bold py-2" style="background: #f5f5f5;">
          <v-col cols="1">Инв. №</v-col>
          <v-col cols="1">Зав. №</v-col>
          <v-col cols="1">Дата получения</v-col>
          <v-col cols="1">Акт получения</v-col>
          <v-col cols="1">Подразделение</v-col>
          <v-col cols="1">Статус</v-col>
          <v-col cols="1">Наименование</v-col>
          <v-col cols="1">Тип</v-col>
          <v-col cols="1">Примечания</v-col>
          <v-col cols="1">Управление</v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row v-for="item in items" :key="item.id" class="text-center align-center py-2">
          <v-col cols="1">{{ item.inv }}</v-col>
          <v-col cols="1">{{ item.zav }}</v-col>
          <v-col cols="1">{{ item.date }}</v-col>
          <v-col cols="1">{{ item.akt }}</v-col>
          <v-col cols="1">{{ item.dep }}</v-col>
          <v-col cols="1"><v-chip color="success" >{{ item.status }}</v-chip></v-col>
          <v-col cols="1">{{ item.name }}</v-col>
          <v-col cols="1">{{ item.type }}</v-col>
          <v-col cols="1">{{ item.comment }}</v-col>
          
          <v-col cols="1">
            <v-btn icon size="small" @click="editItem(item)"><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn icon size="small" @click="copyItem(item)"><v-icon>mdi-content-copy</v-icon></v-btn>
            <v-btn icon size="small" @click="deleteItem(item)"><v-icon>mdi-delete</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, inv: '7777', zav: '111', type : 'ССУИ', comment : '', date: '12.07.2025', akt: '111', status:'good', dep: '7 отделение', name: 'Комплекс' },
        { id: 2, inv: '5734', zav: '2562456', date: '11.02.2222', type : 'ССУИ', comment : '', akt: '543', status:'good', dep: '2 отделение', name: 'Аналоговый ТА' },
        { id: 3, inv: '45764', zav: '47457', date: '11.02.2222', akt: '111', status:'good', type : 'ССУИ', comment : '', dep: '8 отделение', name: 'Аппарат телефонный' },
      ]
    }
  },
  methods: {
    addEquipment() {
      alert('Добавить оборудование')
    },
    backupEquipment() {
      alert('Создать резервную копию оборудования')
    },
    resetFilters() {
      alert('Сброс фильтров')
    },
    editItem(item) {
      alert('Редактировать: ' + item.name)
    },
    copyItem(item) {
      alert('Копировать: ' + item.name)
    },
    deleteItem(item) {
      alert('Удалить: ' + item.name)
    }
  }
}
</script>