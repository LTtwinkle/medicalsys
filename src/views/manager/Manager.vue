<template>
  <div>
    <HeaderBar />
    <div class="manager">
      manager
    </div>
  </div>
</template>
<script>
import HeaderBar from '../../components/HeaderBar.vue';
export default {
  name: 'manager',
  components: {
    HeaderBar,
  },
}
</script>
<style lang="less" scoped>
.manager {
  text-align: center;
}
</style>