<template>
  <v-container fluid class="pa-4 bg-grey-lighten-4" style="min-height: 80vh; background-color: #808080;">
    <v-row class="mb-5">
      <v-col cols="auto">
        <v-btn color="primary" @click="addEquipment">Добавить оборудование</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" variant="outlined" @click="backupEquipment">Создать резервную копию оборудования</v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-card class="pt-5 pa-4 mb-5" style="max-width: 97vw; font-family: 'Roboto', sans-serif;">
      <v-row class="pa-4 bg-blue-lighten-5 rounded" style="gap: 16px;">
        <v-col cols="2">
          <v-text-field
            label="Поиск (Инв., Зав., Акт)"
            variant="outlined"
            density="comfortable"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            label="Наименование оборуд."
            variant="outlined"
            density="comfortable"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-select
            :items="departments"
            label="Подразделение"
            variant="outlined"
            density="comfortable"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-select
            :items="years"
            label="Год"
            variant="outlined"
            density="comfortable"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-select
            :items="types"
            label="Тип"
            variant="outlined"
            density="comfortable"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="2" class="d-flex align-center">
          <v-btn variant="elevated" color="error" @click="resetFilters">Сброс</v-btn>
        </v-col>
      </v-row>
      <v-card-text class="pa-0">
        <v-row class="text-center font-weight-bold ma-0 pa-0 bg-grey-lighten-3" style="width: 100%; border-radius: 8px 8px 0 0;">
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
        <v-row v-for="item in items" :key="item.id" class="text-center align-center py-3 bg-white" style="width: 100%; border-bottom: 1px solid #e0e0e0;">
          <v-col cols="1">{{ item.inventory_number }}</v-col>
          <v-col cols="1">{{ item.factory_number }}</v-col>
          <v-col cols="1">{{ formatDate(item.receiving_date) }}</v-col>
          <v-col cols="1">{{ item.act_of_receiving }}</v-col>
          <v-col cols="1">{{ item.department?.name }}</v-col>
          <v-col cols="1">
            <v-chip :color="statusColor(item.status)" size="small" class="text-white text-uppercase">{{ statusText(item.status) }}</v-chip>
          </v-col>
          <v-col cols="1">{{ item.eq_type?.name }}</v-col>
          <v-col cols="1">{{ item.eq_type?.type }}</v-col>
          <v-col cols="1">{{ item.comment }}</v-col>
          <v-col cols="1" class="d-flex justify-center align-center" style="gap: 8px;">
            <v-hover v-slot="{ isHovering, props }">
              <v-avatar v-bind="props" size="38" :color="isHovering ? 'blue-lighten-4' : 'grey-lighten-3'" class="elevation-2" style="cursor:pointer;">
                <v-icon color="primary" @click="editItem(item)">mdi-pencil</v-icon>
              </v-avatar>
            </v-hover>
            <v-hover v-slot="{ isHovering, props }">
              <v-avatar v-bind="props" size="38" :color="isHovering ? 'blue-lighten-4' : 'grey-lighten-3'" class="elevation-2" style="cursor:pointer;">
                <v-icon color="primary" @click="copyItem(item)">mdi-content-copy</v-icon>
              </v-avatar>
            </v-hover>
            <v-hover v-slot="{ isHovering, props }">
              <v-avatar v-bind="props" size="38" :color="isHovering ? 'red-lighten-4' : 'grey-lighten-3'" class="elevation-2" style="cursor:pointer;">
                <v-icon color="error" @click="deleteItem(item)">mdi-delete</v-icon>
              </v-avatar>
            </v-hover>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      items: [],
      departments: [],
      years: [],
      types: []
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
    // editItem(item) {
    //   alert('Редактировать: ' + (item.eq_type?.name || item.inventory_number))
    // },
    // copyItem(item) {
    //   alert('Копировать: ' + (item.eq_type?.name || item.inventory_number))
    // },
    // deleteItem(item) {
    //   alert('Удалить: ' + (item.eq_type?.name || item.inventory_number))
    // },
    formatDate(dateStr) {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      return d.toLocaleDateString('ru-RU');
    },
    statusColor(status) {
      switch (status) {
        case 'at_work': return 'success';
        case 'broken': return 'error';
        case 'decommissioned': return 'grey';
        default: return 'primary';
      }
    },
    statusText(status) {
      switch (status) {
        case 'at_work': return 'В работе';
        case 'broken': return 'Сломан';
        case 'decommissioned': return 'Списан';
        default: return status;
      }
    }
  },
  async mounted(){
    const fetchData = await axios.get('/api//equipment')
    this.items = fetchData.data.equipments

    const departmentsRes = await axios.get('/api/departments')
    this.departments = departmentsRes.data.map(dep => dep.name)
    this.types = fetchData.data.equipments.map(type => type.eq_type.type)
    this.years =  fetchData.data.equipments.map(year => this.formatDate(year.receiving_date))
  }
}
</script>