<template>
  <div>
    <v-btn color="primary" @click="openCreateDialog">
      Добавить оборудование
    </v-btn>
  </div>
    <v-dialog v-model="dialog" max-width="1200px" persistent>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>{{ action }} нового оборудования</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        
        <v-card-text class="mt-4">
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formData.inventory_number"
                  label="Инвентарный номер"
                  :rules="[v => !!v || 'Обязательное поле']"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formData.factory_number"
                  label="Заводской номер"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formData.act_of_receiving"
                  label="Акт приема"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              
              <v-col cols="12" md="4">
                <v-select
                  v-model="formData.department_id"
                  :items="departments"
                  item-title="name"
                  item-value="id"
                  label="Отделение"
                  outlined
                  dense
                  :rules="[v => !!v || 'Обязательное поле']"
                  
                ></v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="formData.status"
                  :items="statusOptions"
                  item-title="text"     
                  item-value="value"    
                  label="Статус"
                  outlined
                  dense
                  :rules="[v => !!v || 'Обязательное поле']"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formData.receiving_date"
                  label="Дата приема"
                  type="date"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  label="Наименование оборудования"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  v-model="formData.name"
                  item-title="name"     
                  item-value="id"
                  :items="parentSuggestions" 
                  :loading="suggestionLoading"
                  @update:search="onParentSearch"
                  @update:modelValue="onParentSelect"
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="formData.comment"
                  label="Комментарий"
                  outlined
                  dense
                  rows="1"
                ></v-textarea>
              </v-col>
            </v-row>
<!-- //----------------------------------------------------------------------------------------- -->



            <v-card-text class="mt-4">
              <h1>Компоненты</h1>
              <v-row cols="12">

              <template v-for="(child, idx) in formData.childrens" :key="idx">

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="child.factory_number"
                  label="Заводской номер"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="child.status"
                  :items="statusOptions"
                  item-title="text"     
                  item-value="value"    
                  label="Статус"
                  outlined
                  dense
                  :rules="[v => !!v || 'Обязательное поле']"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="child.department_id"
                  :items="departments"
                  item-title="name"
                  item-value="id"
                  label="Отделение"
                  outlined
                  dense
                  :rules="[v => !!v || 'Обязательное поле']"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="child.name"
                  :items="childSuggestions[idx] || []"
                  item-title="name"
                  item-value="id"
                  :loading="childLoading[idx]"
                  hide-details
                  variant="outlined"
                  density="comfortable"
                  label="Наименование оборудования"
                  @update:search="val => onChildSearch(val, idx)"
                  @update:modelValue="val => onChildSelect(val, idx)"
                />
              </v-col>
              <v-col cols="8">
                <v-textarea
                  v-model="child.comment"
                  label="Комментарий"
                  outlined
                  dense
                  rows="1"
                ></v-textarea>
              </v-col>
                  <v-col cols="1" class="">
                    <v-btn icon @click="removeChild(idx)">
                      <v-icon color="red">mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                  <v-divider/>
                </template>
                <v-col cols="12" class="d-flex">
                  <v-btn text small color="primary" @click="addChild">
                    <v-icon left>mdi-plus</v-icon> Добавить компонент
                  </v-btn>
                </v-col>
              </v-row>
              </v-card-text>
          </v-form>
        </v-card-text>
        
        <v-card-actions class="grey lighten-4">
          <div v-if="!valid">Заполните все поля</div>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="dialog = false">
            Отмена
          </v-btn>
          <v-btn 
            color="primary" 
            :loading="loading"
            @click="submitForm"
            :disabled="!valid"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    props: {
      departments: {
        type: Array,
        required: true
      },
      item : {
        type : Object,
        required : false,
        default : null
      },
      mode : {
        String
      },
    },
    
    data() {
      return {
        equipmentType: '',      
        equipmentTypeChild: '', 
        parentSuggestions: [],
        parentLoading: false,
        parentTimeout: null,


        childSuggestions: [],  // уже есть
        childLoading: {},      // <— инициализируем
        childTimeout: {}, 
        dialog: false,
        action: 'Создание',
        valid: false,
        loading: false,
        deleted_equipments : [],
        statusOptions: [
          { text: 'В работе', value: 'at_work' },
          { text: 'В ремонте', value: 'repair' },
          { text: 'В архиве', value: 'archive' },
        //   { text: 'В резерве', value: 'in_reserve' }
        ],
        // typeOptions : [
        //   {text: 'sius', value : '1a10091d-7a71-4d3e-8abd-a401eafdee11'},
        //   {text : 'ssius', value : "b27ca44e-5c4f-4f59-b647-0a3f7907857e"}
        // ],
        formData: {
          department_id: '',
          inventory_number: '',
          factory_number: '',
          receiving_date: new Date().toISOString().substr(0, 10),
          act_of_receiving: '',
          status: 'at_work',
          type: '',
          comment: '',
          parent_id: '',
          childrens: []
        }
      }
    },
    methods: {
      openCreateDialog() {
        this.action = 'Создание'
        this.formData = {
          department_id: '',
          inventory_number: '',
          factory_number: '',
          receiving_date: new Date().toISOString().substr(0, 10),
          act_of_receiving: '',
          status: 'at_work',
          type: '',
          comment: '',
          parent_id: '',
          childrens: []
        };
        this.deleted_equipments = [];
        this.dialog = true;
      },
      addChild() {
        this.formData.childrens.push({
          inventory_number: '',
          factory_number: '',
          act_of_receiving: '',
          status: 'at_work',
          type: '',
          receiving_date: new Date().toISOString().substr(0, 10),
          comment: '',
          parent_id: this.formData.parent_id || '',
          id: undefined,
        });
      },
      removeChild(index) {
        const removed = this.formData.childrens.splice(index, 1)[0];
        if (removed.id) this.deleted_equipments.push(removed.id);
      },
      async submitForm() {
        this.loading = true
        const body = {
          updated_equipment: this.formData,
          deleted_equipments: this.deleted_equipments
        } 
        try {
          if (this.mode == 'edit') {
            const putUpdate = await axios.put('/api/equipment', body)
            console.log(putUpdate);
            console.log(body);
          }
          else{
            const response = await axios.post('/api/equipment', this.formData)  
          }       
          this.$emit('created')
          this.dialog = false
        } catch (error) {
          console.error('Ошибка при создании оборудования:', error)
  
        } finally {
          this.loading = false
        }
      },
      onParentSearch(val) {
        clearTimeout(this.parentTimeout);
        this.parentTimeout = setTimeout(() => {
          this.fetchParentSuggestions(val);
        }, 300);
      },
      async fetchParentSuggestions(query) {
        this.parentLoading = true;
        try {
          const { data } = await axios.get(`/api/equipment-type?name=${query}`);
          console.log(data);
          
          this.parentSuggestions = data;
        } finally {
          this.parentLoading = false;
        }
      },
      onParentSelect(val) {
        this.formData.type = val;
      },

      onChildSearch(val, idx) {
        clearTimeout(this.childTimeout[idx]);
        this.childTimeout[idx] = setTimeout(() => {
          this.fetchChildSuggestions(val, idx);
        }, 300);
      },
      async fetchChildSuggestions(query, idx) {
        this.childLoading[idx] = true;
        try {
          const { data } = await axios.get(`/api/equipment-type?name=${query}`);
          this.childSuggestions[idx] = data;
        } finally {
          this.childLoading[idx] = false;
        }
      },
      onChildSelect(val, idx) {
        this.formData.childrens[idx].type = val;
      },
    },
    mounted(){
    },
    emits: ['created', 'update:search', 'update:modelValue'],  
    watch: {
    item: {
      immediate: false,
      handler(newItem) {
        if (newItem) {
            if (this.mode == "copy") {
              this.action = "Создание"
              this.formData = {
              ...newItem,
              factory_number : '',
              inventory_number : '',
              parent_id: newItem.id, 
              id: undefined,
            };
          }
          if (this.mode == "edit") {
            this.action = "Редактирование"
            this.formData = {
                ...newItem,
            };
          }
          this.formData.childrens = Array.isArray(newItem.components)
          ? newItem.components.map(c => ({
              inventory_number: c.inventory_number || '',
              factory_number: c.factory_number || '',
              act_of_receiving: c.act_of_receiving || '',
              status: c.status || 'at_work',
              department_id: c.department_id,
              inventory_number: c.inventory_number,
              act_of_receiving:c.act_of_receiving,
              name: c.eq_type.name,
              type: c.type || '',
              receiving_date: c.receiving_date ? c.receiving_date.substr(0,10) : new Date().toISOString().substr(0,10),
              comment: c.comment || '',
              parent_id: c.parent_id || newItem.id,
              id: c.id || undefined,
            }))
          : [];
        this.dialog = true;
        }
      }
    }
  },
  }
  </script>
  
  <style scoped>
  .v-card {
    border-radius: 8px;
  }
  .v-toolbar {
    border-radius: 8px 8px 0 0;
  }
  </style>