<template>
    <Card>
    <template #title>
        Contract Number
    </template>
    <template #content>
       <p>
        Total votes: <b>123123</b> <br>
       </p>
       <p>
        Total answers: <b>123</b>
       </p>
       
    </template>
    <template #footer>
        <div class = "flex justify-content-end">
            <Button class = "p-button" icon="pi pi-cog" label="Manage" />
        </div>
    </template>
</Card>

</template>

<script setup>

</script>

<style scoped>

</style>