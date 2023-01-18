<template>
  <div class="home">

    <h1>All rounds will be listed here</h1>
    <template v-if="fetched" v-for="c in contracts" :key="c.contractAddress">
      <ContractPreviewPlayCard :question = "c.question" :contractAddress="c.contractAddress" :blockNumber="c.blockNumber" class="mb-4"/>
    </template>
    
    
  </div>
</template>

<script setup>
// @ is an alias to /src
import ContractPreviewPlayCard from '../components/ContractPreviewPlayCard.vue';
import { onMounted, ref } from 'vue'
const axios = require('axios');
const fetched = ref(false);
const contracts = ref([]);

onMounted(() => {
    console.log('mounted!')
    axios.get('http://localhost:8080/api/contracts', {
    }).then(function(res){
      console.log(res);
      contracts.value = res.data;
      fetched.value = true;
    }).catch(function(error){
      console.log(error);
    });
})
</script>
