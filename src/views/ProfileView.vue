<template>
    <div>
      <ContractAdd/>
      <h3>All owned rounds will be listed here</h3>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import ContractAdd from "@/components/ContractAdd.vue";
  
  export default {
    name: "ProfileView",
    components: {
      ContractAdd,
    },
  };
  </script>
  