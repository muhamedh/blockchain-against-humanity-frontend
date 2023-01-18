<template>
    <Card>
    <template #title>
        {{props.contractAddress}}
    </template>
    <template #content>
       <p>
        Blocknumber: <b>{{ props.blockNumber }}</b> <br>
       </p>
       <p>
        Your address: <b>{{props.creatorAddress}}</b>
       </p>
       
    </template>
    <template #footer>
        <div class = "flex justify-content-end">
            <Button class = "p-button" icon="pi pi-cog" label="Manage" @click="redirectToManage"/>
        </div>
    </template>
</Card>

</template>

<script setup>
import router from '@/router';

const props = defineProps({
  contractAddress: String,
  blockNumber: String,
  creatorAddress: String
});

const redirectToManage = (()=>{
    console.log('redirect initialized');
    router.push(`/${props.contractAddress}/manage`);
});
</script>

<style scoped>

</style>