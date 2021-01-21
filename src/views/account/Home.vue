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
      liveTime: 30,
      userType: '',
      timer: null,
    }
  },
  watch: {
    waitChoose: function(val) {
      if(val == false) {
        this.liveTime = 30;
        // 进入等待刷卡页面，每秒更新截止时间
        this.timer = setInterval(() => {
          this.liveTime -=1;
        }, 1000);
        // 30s内没有进入新页面，就返回登录主页
        setTimeout(() => {
          this.waitChoose = true;
        }, 30000);
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
  methods: {
    // 患者刷卡等待
    WaitLogin(type) {
      this.waitChoose = false;
      this.userType = type;
      this.$axios.post('/user/card')
      .then((res) => {
        if(res.code == '00000000') {
          this.waitChoose = true;
          return;
        }
        this.LoginJudge(res.code);
      })
    },
    LoginJudge(card_id) {
      this.$axios.post('/user/Patient_login_judge', {
        card_id,
      })
      .then((res) => {
        if(res.code == 100) {
          // 账号非空，直接登录
          sessionStorage.setItem('card_id', res.data);
          this.Login(this.userType);
        } else if(res.code == 0) {
          // 账号为空，进行注册
          sessionStorage.setItem('card_id', res.data);
          this.$message.info('请前往注册');
          this.$router.push('/register');
        } else {
          // 患者未刷卡，继续请求判断
        }
      })
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