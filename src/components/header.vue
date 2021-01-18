<template>
  <div class="header">
    <i class="el-icon-back" @click="goBack"></i>
    <i class="el-icon-switch-button"></i>
  </div>
</template>

<script>
export default {
  name: 'header',
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  i {
    font-size: 30px;
  }
}
</style>