<template>
    <div>
      <ContractAdd/>
      <h3 class="text-center mt-8">Your owned contracts</h3>
      <Button class = "p-button" icon="pi pi-cog" label="Fetch owned contracts" @click="loadOwnedContracts" />
      <!-- //TODO ovdje cemo ako ne stignem sorting buttons onda cemo samo spucati sve
           //TODO 3. unesite svoju adresu i dobijte svoje trenutne kontrakte -->
      <div class = "grid flex gap-3 justify-content-center" v-for="c in ownedContracts" :key="c.contractAddress">
          <ContractPreviewCard 
            :contractAddress="c.contractAddress"
            :blockNumber="c.blockNumber"
            :creatorAddress="c.creatorAddress"
          class = "col-12 md:col-6 mt-3"/>
      </div>

    </div>
  </template>
  
  <script setup>
  // @ is an alias to /src
  import ContractAdd from "@/components/ContractAdd.vue";
  import ContractPreviewCard from "@/components/ContractPreviewCard.vue";
  import { ethers } from "ethers";
  import { ref } from "vue";

  const axios = require('axios');
  const userAddress = ref(null);
  const ownedContracts = ref([]);

  const loadOwnedContracts = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

  if(provider.code === "CALL_EXCEPTION"){
    toast.add({
      severity: "error",
      summary: "An error has occured.",
      life: 3000,
    });
	return;
  }

  const signer = provider.getSigner();
  userAddress.value = await signer.getAddress();
    console.log(userAddress.value);

    // spucaj ajax call za owned contracts
    //TODO izvuci link u env var
    axios.get('http://localhost:8080/api/contracts/scoped', {
      params :{"creatorAddress" : userAddress.value}
    }).then(function(res){
      ownedContracts.value = res.data;
      console.log(ownedContracts.value);
    }).catch(function(error){
      console.log(error);
    })

  };

  </script>
  