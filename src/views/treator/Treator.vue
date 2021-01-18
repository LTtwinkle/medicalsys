<template>
  <div>
    <HeaderBar />
    <div class="treator">
      treator
    </div>
  </div>
</template>
<script>
import HeaderBar from '../../components/HeaderBar.vue';
export default {
  name: 'treator',
  components: {
    HeaderBar,
  },
}
</script>
<style lang="less" scoped>
.treator {
  text-align: center;
}
</style>