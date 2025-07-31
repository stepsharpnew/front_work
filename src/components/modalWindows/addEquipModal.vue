<template>
    <v-dialog v-model="dialog" max-width="800px" persistent>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props" class="mb-4">
          Добавить оборудование
        </v-btn>
      </template>
      
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Создание нового оборудования</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        
        <v-card-text class="mt-4">
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.inventory_number"
                  label="Инвентарный номер"
                  :rules="[v => !!v || 'Обязательное поле']"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.factory_number"
                  label="Заводской номер"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.act_of_receiving"
                  label="Акт приема"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              
              <v-col cols="12" md="6">
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
              <v-col cols="12" md="6">
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
              <v-col cols="12" md="6">
                <v-select
                  label="Тип оборудования"
                  v-model="formData.type"
                  :items="typeOptions"
                  item-title="text"     
                  item-value="value"  
                  outlined
                  dense
                  :rules="[v => !!v || 'Обязательное поле']"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.receiving_date"
                  label="Дата приема"
                  type="date"
                  outlined
                  dense
                ></v-text-field>
              </v-col>         
              <v-col cols="12">
                <v-textarea
                  v-model="formData.comment"
                  label="Комментарий"
                  outlined
                  dense
                  rows="2"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        
        <v-card-actions class="grey lighten-4">
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
      }
    },
    
    data() {
      return {
        dialog: false,
        valid: false,
        loading: false,
        statusOptions: [
          { text: 'В работе', value: 'at_work' },
          { text: 'В ремонте', value: 'repair' },
          { text: 'Списано', value: 'archive' },
        //   { text: 'В резерве', value: 'in_reserve' }
        ],
        typeOptions : [
          {text: 'sius', value : '1a10091d-7a71-4d3e-8abd-a401eafdee11'},
          {text : 'ssius', value : "b27ca44e-5c4f-4f59-b647-0a3f7907857e"}
        ],
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
      async submitForm() {
        // if (!this.$refs.form.validate()) return
        this.loading = true
        try {
          const response = await axios.post('/api/equipment', this.formData)         
          this.$emit('created')
          this.dialog = false

          // this.$refs.form.reset()
        } catch (error) {
          console.error('Ошибка при создании оборудования:', error)
          // Здесь можно добавить обработку ошибок (например, показать уведомление)
        } finally {
          this.loading = false
        }
      }
    },
    mounted(){
      
    },
    watch: {
    item: {
      immediate: false,
      handler(newItem) {
        if (newItem) {
          console.log(newItem);
          this.formData = {
            ...newItem,
            factory_number : '',
            inventory_number : '',
            parent_id: newItem.id, 
            id: undefined,
            // created_at: undefined,
            // …
          };
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