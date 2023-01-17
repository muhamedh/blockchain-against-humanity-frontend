<template>
  <!-- TODO zadnji na tapeti vjv samo izkomentarisati a mozda ni to-->
  <div class="home">
    <h3>Change theme</h3>
  </div>
</template>

<script setup>
// @ is an alias to /src

import { ref, watch, onMounted } from "vue";

const selectedTheme = ref("Dark");

const themeDark = "Dark"

onMounted(async () => {
  /**
   * Perform check to see if there is already a theme preference
   */
  var themePreference = localStorage.getItem('theme');
  if(themePreference == null){
    console.log('no theme preference');
  }else{
    console.log('from on mount', themePreference);
    selectedTheme.value = themePreference;
    console.log('from onmount: ', selectedTheme);
  }

});
    
watch(selectedTheme,() =>{
    console.log(selectedTheme._value.themeName);
    localStorage.setItem('theme', selectedTheme._value.themeName);
    console.log('right after: ', localStorage.getItem('theme'));

});


    

/*
export default {
  data() {
    return {
      selectedTheme: null,
      themes: [
        {
          themeName: "Light",
        },
        {
          themeName: "Dark",
        },
        {
          themeName: "Funky",
        },
      ],
    };
  },
};*/
</script>
