<template>
  <div>
    <div v-if="waitChoose" class="login">
      <!-- <Header /> -->
      <p>医院诊疗系统</p>
      <div class="IdentityChoice">
        <el-button type="primary" @click="patientLogin">患者登录</el-button>
        <el-button type="success">医生登录</el-button>
        <el-button type="info">管理员登录</el-button>
      </div>
    </div>
    <div v-else class="useCache">请刷卡！</div>
  </div>
  
</template>

<script>
// import Header from '../../components/header.vue'
export default {
  name: 'login',
  // components: {
  //   Header,
  // },
  data() {
    return {
      waitChoose: true,
    }
  },
  methods: {
    patientLogin() {
      this.waitChoose = false;
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  width: 400px;
  margin: 0 auto;
  text-align: center;
  p {
    font-size: 40px;
    padding-top: 30px;
    padding-bottom: 40px;
  }
  .IdentityChoice {
    width: 200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.useCache {
  text-align: center;
  margin-top: 40vh;
  font-size: 30px;
  color: red;
}

.el-button+.el-button {
  margin-left: 0;
  margin-top: 20px;
}
</style> 