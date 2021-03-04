<template>
  <div>
      <el-button type="info" @click="clear">退出</el-button>
  </div>
</template>

<script>
export default {
    name: 'home',
    methods:{
        clear(){
            window.sessionStorage.clear();
            this.$router.push('/login');
        }
    }
}
</script>

<style>

</style>