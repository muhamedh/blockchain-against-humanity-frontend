<template>
    <Panel>
        <template #header v-if="isProcessing">
            Processing...
        </template>
        <template #header v-else>
            Processed.
        </template>
        <div v-if="isProcessing">
            <div class = "text-left flex flex-wrap justify-content-start">
                <div>
                    <p>Your contract will be deployed on address:</p>
                </div>
                <div>
                    <p class = "font-bold">{{props.contractAddress}}</p>
                </div>
                
            </div>
        </div>
        <div v-else>
            <div class = "flex flex-wrap justify-content-start">
                <div>
                    <p>Your contract was deployed on address:</p>
                </div>
                <div class = "">
                    <p class = "wrapper font-bold">{{props.contractAddress}}</p>
                </div>
            </div>
            <div class = "text-left flex flex-wrap justify-content-start">
                <div>
                    <p>Blocknumber:</p>
                </div>
                <div>
                    <p class = "font-bold">{{props.blockNumber}}</p>
                </div>
            </div>
            <div class = "flex justify-content-center">
                <Button label = "Manage your round here!" class = "p-button-success p-button-raised" @click="redirectToManage()"></Button>
            </div>
        </div>
    </Panel>
</template>

<script setup>

import { ref, watch } from 'vue';
import router from '@/router';


const props = defineProps({
  contractAddress: String,
  blockNumber: Number
});

const isProcessing = ref(false)
watch(
    () => props.blockNumber,
    (blockNumber) => {
        if(blockNumber != null){
            isProcessing.value = false;
        }
    }
);

const redirectToManage = (()=>{
    console.log('redirect initialized');
    router.push(`/${props.contractAddress}/manage`);
});

</script>

<style scoped>
.wrapper{
    word-break: break-all;
    white-space: normal;
}
</style>