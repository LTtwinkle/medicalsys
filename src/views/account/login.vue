<template>
  <div>
    <Header />
    <div class="login">
      <h2>患者登录</h2>
      <el-form :model="loginValidateForm" ref="loginValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="密码"
          prop="password"
          :rules="[
            { required: true, message: '密码不能为空'},
          ]"
        >
          <el-input type="password" v-model="loginValidateForm.password" maxlength="8" placeholder="请输入8位数字、字母" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginValidateForm')">登录</el-button>
          <el-button @click="resetForm('loginValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div>第一次登录？<el-link type="primary" @click="ToRegister">去注册</el-link></div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header.vue';
export default {
  name: 'login',
  components: {
    Header,
  },
  data() {
    return {
      loginValidateForm: {
        password: '',
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
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