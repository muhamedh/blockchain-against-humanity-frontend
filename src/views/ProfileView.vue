<template>
    <div>
      <ContractAdd/>
      <h3 class="text-center mt-8">Your owned contracts</h3>
      <h3 class="text-center mb-8">Place for sorting filtering buttons.</h3>
      <div class = "grid flex gap-3 justify-content-center">
      <ContractPreviewCard class = "col-12 md:col-3 mt-3"/>
      <ContractPreviewCard class = "col-12 md:col-3 mt-3"/>
      <ContractPreviewCard class = "col-12 md:col-3 mt-3"/>
      <ContractPreviewCard class = "col-12 md:col-3 mt-3"/>
      <ContractPreviewCard class = "col-12 md:col-3 mt-3"/>
      <ContractPreviewCard class = "col-12 md:col-3 mt-3"/>
      <ContractPreviewCard class = "col-12 md:col-3 mt-3"/>
      <ContractPreviewCard class = "col-12 md:col-3 mt-3"/>
      <ContractPreviewCard class = "col-12 md:col-3 mt-3"/>
      </div>

    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import ContractAdd from "@/components/ContractAdd.vue";
  import ContractPreviewCard from "@/components/ContractPreviewCard.vue";

  export default {
    name: "ProfileView",
    components: {
      ContractAdd,
      ContractPreviewCard
    },
  };
  </script>
  