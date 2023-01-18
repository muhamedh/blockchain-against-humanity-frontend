<template>
    <Card>
    <template #title>
        {{props.contractAddress}}
    </template>
    <template #content>
       <p>
        Question: {{props.question}}
       </p>
       <p>
        Blocknumber : {{props.blockNumber}}
       </p>
    </template>
    <template #footer>
        <div class = "flex justify-content-end">
            <Button class = "p-button" label="Play" @click="redirectToPlay" />
        </div>
    </template>
</Card>

</template>

<script setup>
import router from '@/router';

const props = defineProps({
  contractAddress: String,
  blockNumber: String,
  question: String
});

const redirectToPlay = (()=>{
    console.log('redirect initialized');
    router.push(`/${props.contractAddress}/play`);
});
</script>

<style scoped>

</style>