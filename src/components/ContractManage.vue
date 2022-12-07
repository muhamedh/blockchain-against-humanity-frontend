<template>
  <Toast></Toast>
  <div class="">
    <div v-if="isFetching" class="mt-8">
      <ProgressSpinner
        aria-label="Loading"
        style="width: 50px; height: 50px"
        animationDuration=".8s"
        class="center-svg"
      />
    </div>
    <div v-else>
      <Card class = "m-8">
        <template #title>
          <h5 class="wrapper">
            Contract number <br />
            {{ contractAddress }}
          </h5>
        </template>
        <template #content v-if = "answers.length > 0">
          <h4>Current answers:</h4>
          <div v-for="answer in answers">
            <div>
              <p class="wrapper"><b>Answer: </b> {{ answer[0] }}</p>
            </div>
            <div>
              <p class="wrapper"><b>Vote count:</b> {{ answer[1] }}</p>
            </div>
            <Divider></Divider>
          </div>
        </template>
        <template #footer>
          <Button
            class="p-button-raised p-button-sm p-button-danger"
            label="End round"
            @click="handleEndRound()"
          ></Button>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import router from "@/router";
import { ethers } from "ethers";
import { useToast } from "primevue/usetoast";
import abi from "./abi.json";

const isFetching = ref(true);
const contractAddress = ref(null);
contractAddress.value = router.currentRoute.value.params.contractAddress;
const contract = ref(null);
const answers = ref([]);
var provider = null;
const toast = useToast();
const logger = new ethers.utils.Logger();

onMounted(async () => {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  contract.value = new ethers.Contract(contractAddress.value, abi, provider);

  answers.value = await contract.value.viewAnswers();

  isFetching.value = false;
});

const handleEndRound = async () => {

  const contractInside = new ethers.Contract(
    contractAddress.value,
    abi,
    provider
  );

  var e = null;
  var r = null;

  try{
    e = await contractInside.connect(provider.getSigner()).finishRound();
  }catch(error){
    toast.add({
      severity: "error",
      summary: 'Fatal error',
      detail: error.reason.substring(error.reason.indexOf("'")+1,error.reason.length-1), // extracts the solidity returned error from error
      life: 5000,
    });
    
  }

  try{
    r = await e.wait();
    toast.add({
      severity: "success",
      summary: "Round closed",
      detail: "Round closed in block number " + r.blockNumber,
      life: 3000,
    })
  }catch(error){
    toast.add({
      severity: "error",
      summary: 'Fatal error',
      detail: 'Error occured while waiting for transaction to finish.',
      life: 3000,
    });
  }

};
</script>

<style>
.center-svg {
  display: block !important;
  margin: auto !important;
}
.wrapper {
  word-break: break-all;
  white-space: normal;
}
</style>
