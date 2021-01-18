<template>
  <div>
    <div v-if="waitChoose" class="home">
      <p>医院诊疗系统</p>
      <div class="IdentityChoice">
        <el-button type="primary" @click="patientLogin">患者登录</el-button>
        <el-button type="warning">医生登录</el-button>
        <el-button type="warning">诊疗师登录</el-button>
        <el-button type="success">药房登录</el-button>
        <el-button type="info">管理员登录</el-button>
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
    }
  },
  watch: {
    waitChoose: function(val) {
      if(val == false) {
        // 刷卡后，三秒内跳转到登录/注册界面
        setTimeout(() => {
          // console.log('go')
          this.$router.push('/login');
          // this.waitChoose = true;
        }, 3000);
      }
    },
  },
  methods: {
    patientLogin() {
      this.waitChoose = false;

      // this.$axios.post('/user/addUser', {id: '12', username: 'ggs', age: '22'})
      // .then((res) => {
      //   console.log(res)
      // })
    },
    // readCard() {
    //   let res="00000000";
    //   let i = 1;
    //   let fso, file;
    //   let ForReading = 1;
    //   while(i){
    //     fso = new ActiveXObject("Scripting.FileSystemObject");
    //     file = fso.OpenTextFile("C:\\Users\\hp\\Desktop\\temp\\temp\\test.txt", ForReading);
    //     res = file.ReadAll();
    //     if(res!="00000000"){
    //       break;
    //     }
    //   }
    //   // console.log(res);
    // },
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