<template>
  <div>
    <HeaderBar />
    <div class="patient">
      patient
    </div>
  </div>
</template>
<script>
import HeaderBar from '../../components/HeaderBar.vue';
export default {
  name: 'patient',
  components: {
    HeaderBar,
  },
}
</script>
<style lang="less" scoped>
.patient {
  text-align: center;
}
</style>