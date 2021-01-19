<template>
  <div>
    <HeaderBar />
    <div class="patient">
      <h2>患者主界面</h2>
      <div class="info">
        <el-image class="portrait"
          :src="url"
          fit="cover">
        </el-image>
        <ul>
          <li>姓名：{{patient.name}}</li>
          <li>性别：{{patient.sex}}</li>
          <li>身份证号：{{patient.cardID}}</li>
          <li>卡内余额：{{patient.balance}}</li>
        </ul>
      </div>
      <div class="action">
        <el-button type="primary" @click="$router.push('/registration')">挂号</el-button>
        <el-button type="primary" @click="$router.push('/payfees')">缴费</el-button>
        <el-button type="primary" @click="$router.push('/recharge')">充值</el-button>
        <el-button type="primary" @click="$router.push('/diagnoseLog')">诊断记录</el-button>
      </div>
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
  data() {
    return {
      url: '',
      patient: {
        name: '张三',
        sex: '男',
        cardID: '12345678',
        balance: '100',
      }
    }
  }
}
</script>
<style lang="less" scoped>
ul,li {
  list-style: none;
}
.patient {
  width: 550px;
  margin: 0 auto;
  h2 {
    text-align: center;
    padding-top: 20px;
  }
  .info {
    display: flex;
    .portrait {
      width: 100px;
      min-width: 100px;
      height: 100px;
      border-radius: 10px;
      margin: 15px 0;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      li {
        min-width: 200px;
        margin: 15px 0;
      }
    }
  }
  .action {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
  }
}
</style>