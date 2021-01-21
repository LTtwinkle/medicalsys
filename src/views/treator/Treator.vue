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
  data() {
    return {
      treatorID: '',
    }
  },
  mounted() {
    this.treatorID = sessionStorage.getItem('treator_id');
    console.log(this.treatorID)
  }
}
</script>
<style lang="less" scoped>
.treator {
  text-align: center;
}
</style>