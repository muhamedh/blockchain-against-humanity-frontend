<template>
  <Toast/>
  <TabMenu :model="items" class = "mb-4"></TabMenu>
  <!-- 
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/profile">About</router-link>
  </nav>
  --> 
  <router-view />
</template>
<script >
  export default{
    data(){
      return { 
        items : [
        {
          label: 'Home', icon: 'pi pi-fw pi-home', to: '/'
        },
        {
          label: 'Profile', icon: 'pi pi-fw pi-pencil', to: '/profile'
        },
        {
          label: 'Settings', icon: 'pi pi-fw pi-cog', to: '/settings'
        }
        ]
      }
    }
  }
</script>
<style>

</style>
