<template>
  <div>
    <HeaderBar />
    <div class="doctor">
      doctor
    </div>
  </div>
</template>
<script>
import HeaderBar from '../../components/HeaderBar.vue';
export default {
  name: 'doctor',
  components: {
    HeaderBar,
  },
}
</script>
<style lang="less" scoped>
.doctor {
  text-align: center;
}
</style>