<template>
  <div>
    <HeaderBar />
    <div class="pharmacy">
      pharmacy
    </div>
  </div>
</template>
<script>
import HeaderBar from '../../components/HeaderBar.vue';
export default {
  name: 'pharmacy',
  components: {
    HeaderBar,
  },
}
</script>
<style lang="less" scoped>
.pharmacy {
  text-align: center;
}
</style>