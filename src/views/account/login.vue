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
          alert('submit!');
          console.log(this.AcctPwdForm)
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
          this.url = '/1',
          this.formType = false;
          break;
        case '管理员':
          this.url = '/2',
          this.formType = false;
          break;
        case '医生':
          this.url = '/3';
          this.formType = true;
          break;
        case '诊疗师':
          this.url = '/4';
          this.formType = true;
          break;
        case '药房':
          this.url = '/5';
          this.formType = true;
          break;
        default:
          break;
      }
    },
    Login() {
      
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