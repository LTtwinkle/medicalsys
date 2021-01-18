<template>
  <div>
    <div v-if="waitChoose" class="home">
      <p>医院诊疗系统</p>
      <div class="IdentityChoice">
        <el-button type="primary" @click="WaitLogin('患者')">患者登录</el-button>
        <el-button type="warning" @click="Login('医生')">医生登录</el-button>
        <el-button type="warning" @click="Login('诊疗师')">诊疗师登录</el-button>
        <el-button type="success" @click="Login('药房')">药房登录</el-button>
        <el-button type="info" @click="Login('管理员')">管理员登录</el-button>
      </div>
    </div>
    <div v-else class="useCache">
      请刷卡！
      <p>倒计时 {{liveTime}} s</p>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      waitChoose: true,
      liveTime: 60,
      userType: '',
    }
  },
  watch: {
    waitChoose: function(val) {
      if(val == false) {
        // 刷卡后，三秒内跳转到登录/注册界面
        setTimeout(() => {
          // console.log('go')
          // this.$router.push('/login');
          this.Login(this.userType);
          // this.waitChoose = true;
        }, 3000);
      }
    },
  },
  methods: {
    WaitLogin(type) {
      this.waitChoose = false;
      this.userType = type;
      // this.$axios.post('/user/addUser', {id: '12', username: 'ggs', age: '22'})
      // .then((res) => {
      //   console.log(res)
      // })
    },
    Login(userType) {
      this.$router.push({
        name: 'Login',
        params: {
          userType,
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home{
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
  p {
    font-size: 25px;
  }
}

.el-button+.el-button {
  margin-left: 0;
  margin-top: 20px;
}
</style> 