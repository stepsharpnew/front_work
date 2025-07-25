
<template>
  
    <v-container class="w-100">
      <MainNavBar/>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
            :width="200"
            aspect-ratio="16/9"
            cover
            class="mx-auto"
          ></v-img>
        </v-col>
  
        <v-col class="mb-4">
          <h1 class="text-h3 font-weight-bold mb-3">
            Welcome to VuetifyCltkfq
          </h1>
  
          <p class="text-subtitle-1">
            Vite + Vue + Vuetify + Router template
          </p>
        </v-col>
  
        <v-col class="mb-5" cols="12">
          <v-btn
            variant="outlined"
            to="/about"
            color="primary"
            size="large"
          >
            Go to About
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>


<script>
import MainNavBar from '../components/MainNavBar.vue';


export default {
  data(){
    return{
      
    }
  },
  components : {
    MainNavBar
  }
}
</script>