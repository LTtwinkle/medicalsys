<template>
  <div class="headerbar">
    <i class="el-icon-back" @click="goBack"></i>
    <i class="el-icon-switch-button" @click="ExitLogin"></i>
  </div>
</template>

<script>
export default {
  name: 'headerbar',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    ExitLogin() {
      this.$router.replace('/');
      sessionStorage.removeItem('card_id');
      sessionStorage.removeItem('doctor_id');
      sessionStorage.removeItem('treator_id');
    }
  }
}
</script>

<style lang="less" scoped>
.headerbar {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  i {
    font-size: 30px;
  }
}
</style>