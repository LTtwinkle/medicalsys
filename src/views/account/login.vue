<template>
  <div>
    <HeaderBar />
    <div class="login">
      <h2>{{userType}}登录</h2>
      <el-form v-show="!formType" :model="onlyPwdForm" ref="onlyPwdForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="密码"
          prop="password"
          :rules="[
            { required: true, message: '密码不能为空'},
          ]"
        >
          <el-input type="password" v-model="onlyPwdForm.password" maxlength="8" placeholder="请输入8位数字、字母" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('onlyPwdForm')">登录</el-button>
          <el-button @click="resetForm('onlyPwdForm')">重置</el-button>
        </el-form-item>
      </el-form>

      <el-form v-show="formType" :model="AcctPwdForm" ref="AcctPwdForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="账号"
          prop="account"
          :rules="[
            { required: true, message: '账号不能为空'},
          ]"
        >
          <el-input v-model="AcctPwdForm.account" placeholder="请输入账号" maxlength="10" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[
            { required: true, message: '密码不能为空'},
          ]"
        >
          <el-input type="password" v-model="AcctPwdForm.password" maxlength="8" placeholder="请输入8位数字、字母" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('AcctPwdForm')">登录</el-button>
          <el-button @click="resetForm('AcctPwdForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div v-if="userType == '患者'">第一次登录？<el-link type="primary" @click="ToRegister">去注册</el-link></div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '../../components/HeaderBar.vue';
export default {
  name: 'login',
  components: {
    HeaderBar,
  },
  data() {
    return {
      onlyPwdForm: {
        password: '',
      },
      AcctPwdForm: {
        password: '',
        account: '',
      },
      userType: '',
      formType: false,
      url: '',
      toLink: '',
    }
  },
  mounted() {
    let userType =  this.$route.params?.userType;
    this.userType = userType;
    this.setLoginType(userType);
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message('submit!');
          this.Login();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    ToRegister() {
      this.$router.replace('/register')
    },
    setLoginType(userType) {
      switch(userType) {
        case '患者':
          this.url = '/user/Patient_login';
          this.toLink = '/patient';
          this.formType = false;
          break;
        case '管理员':
          this.url = '/2';
          this.toLink = '/manager';
          this.formType = false;
          break;
        case '医生':
          this.url = '/user/Doctor_Login';
          this.toLink = '/doctor';
          this.formType = true;
          break;
        case '诊疗师':
          this.url = '/4';
          this.toLink = '/treator';
          this.formType = true;
          break;
        case '药房':
          this.url = '/5';
          this.toLink = '/pharmacy';
          this.formType = true;
          break;
        default:
          break;
      }
    },
    Login() {
      let data = {};
      if(this.formType) {
        // 账号密码登录
        data = this.AcctPwdForm;
      } else{
        // 密码登录
        data.passwd = this.onlyPwdForm.password;
        if(this.url == '/user/Patient_login') {
          // data.card_id = sessionStorage.getItem('card_id');
          data.card_id = '1';
        }
      }
      console.log(data);
      this.$axios.post(this.url,data)
      .then((res) => {
        console.log(res);
        if(res.code == '200') {
          console.log(res.data);
          this.$message.success('登录成功！');
          this.$router.push(this.toLink);
        } else {
          this.$message.error(res?.message);
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 350px;
  margin: 0 auto;
  padding-top: 40px;
  text-align: center;
  h2 {
    padding: 40px 0;
    margin-left: 80px;
  }
}
</style> 