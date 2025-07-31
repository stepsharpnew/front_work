<template>
  <v-container fluid class="pa-4 bg-grey-lighten-4 min-h-screen">
    <MainNavBar />
    <v-row class="mb-5">
      <v-col cols="auto">
        <EquipmentCreateDialog 
        :departments="departmentsList" 
        @created="refreshEquipmentList"
      />
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" variant="outlined" @click="backupEquipment">Создать резервную копию оборудования</v-btn>
      </v-col>
    </v-row>

    <v-card class="pa-4 mb-5 mx-auto" max-width="97vw" style="font-family: 'Roboto', sans-serif;">
      <v-row class="pa-3 bg-blue-lighten-5 rounded gap-x-4">
        <v-col cols="3">
          <v-text-field
            label="Поиск (Инв., Зав., Акт)"
            variant="outlined"
            density="comfortable"
            hide-details
            v-model="filters.search"
            @input="fetchData()"
          ></v-text-field>
        </v-col>
        <!-- <v-col cols="2">
          <v-text-field
            label="Наименование оборудования"
            variant="outlined"
            density="comfortable"
            hide-details
            v-model="filters.name"
            @input="fetchData()"
          ></v-text-field>
        </v-col> -->
        <v-col cols="2">
          <v-select
            :items="departments"
            label="Подразделение"
            variant="outlined"
            density="comfortable"
            hide-details
            v-model="filters.department"
            @update:modelValue="fetchData()"
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-select
            :items="years"
            label="Год"
            variant="outlined"
            density="comfortable"
            hide-details
            v-model="filters.year"
            @update:modelValue="fetchData()"
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-select
            :items="types"
            label="Тип"
            variant="outlined"
            density="comfortable"
            hide-details
            v-model="filters.type"
            @update:modelValue="fetchData()"
          ></v-select>
        </v-col>
        <v-col cols="2" class="d-flex align-center">
          <v-btn variant="elevated" color="error" @click="resetFilters">Сброс</v-btn>
        </v-col>
      </v-row>
      <v-card-text class="pa-0 ma-0">
        <v-row class="text-center font-weight-bold mt-4 bg-grey-lighten-3 rounded-t" style="font-size: 0.98rem; height: 100px;">
          <v-col cols="1" class="d-flex justify-center align-center text-no-wrap">Инв. №</v-col>
          <v-col cols="1" class="d-flex justify-center align-center text-no-wrap">Зав. №</v-col>
          <v-col cols="1" class="d-flex justify-center align-center text-no-wrap">Дата<br>получения</v-col>
          <v-col cols="1" class="d-flex justify-center align-center text-no-wrap">Акт<br>получения</v-col>
          <v-col cols="1" class="d-flex justify-center align-center text-no-wrap">Подразделение</v-col>
          <v-col cols="1" class="d-flex justify-center align-center text-no-wrap">Статус</v-col>
          <v-col cols="2" class="d-flex justify-center align-center text-no-wrap">Наименование</v-col>
          <v-col cols="1" class="d-flex justify-center align-center text-no-wrap">Тип</v-col>
          <v-col cols="2" class="d-flex justify-center align-center text-no-wrap">Примечания</v-col>
          <v-col cols="1" class="d-flex justify-center align-center text-no-wrap">Управление</v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row v-for="item in items" :key="item.id" class="text-center align-center py-3 bg-white border-b" >
          <v-col cols="1" class="d-flex justify-center align-center">{{ item.inventory_number }}</v-col>
          <v-col cols="1" class="d-flex justify-center align-center">{{ item.factory_number }}</v-col>
          <v-col cols="1" class="d-flex justify-center align-center">{{ formatDate(item.receiving_date) }}</v-col>
          <v-col cols="1" class="d-flex justify-center align-center">{{ item.act_of_receiving }}</v-col>
          <v-col cols="1" class="d-flex justify-center align-center">{{ item.department?.name }}</v-col>
          <v-col cols="1" class="d-flex justify-center align-center">
            <v-chip :color="statusColor(item.status)" size="small" class="text-white text-uppercase">{{ statusText(item.status) }}</v-chip>
          </v-col>
          <v-col cols="2" class="d-flex justify-center align-center">{{ item.eq_type?.name }}</v-col>
          <v-col cols="1" class="d-flex justify-center align-center">{{ item.eq_type?.type }}</v-col>
          <v-col cols="2" class="d-flex justify-center align-center">{{ item.comment }}</v-col>
          <v-col cols="1" class="d-flex justify-center align-center gap-x-2">
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
import MainNavBar from '../components/MainNavBar.vue';
import EquipmentCreateDialog from '../modalWindows/addEquipModal.vue'

export default {
  components : {
    MainNavBar,
    EquipmentCreateDialog
  },
  data() {
    return {
      items: [],
      departments: [],
      years: [],
      types: [],
      filters: {
        search: '',
        name: '',
        department: '',
        year: '',
        type: '',
      },
      paginatedData:[]
    }
  },
  methods: {
    async fetchData() {
      const departmentsRes = await axios.get('/api/departments');
      const departmentsObj = [...new Set(departmentsRes.data)];
      this.departments = departmentsObj.map(dep => dep.name); 
      let params = { ...this.filters };
      if (params.department) {
        const department = departmentsObj.find(dep => dep.name === params.department);
        if (department) {
          params.department = department.id;
        }
      }
      const response = await axios.get('/api/equipment', { params });
      this.items = response.data.equipments;
      console.log(this.items);
      
    },

    resetFilters() {
      this.filters = { search: '', name: '', department: '', year: '', type: '' };
      this.fetchData();
    },

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
    await this.fetchData();

    this.types = [...new Set(this.items.map(item => item.eq_type.type))];
    this.years = [...new Set(this.items
      .map(item => {
        const date = item.receiving_date ? new Date(item.receiving_date) : null;
        return date ? date.getFullYear() : null;
      })
      .filter(year => year !== null)
    )];
  },


}
</script>