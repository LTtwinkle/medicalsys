<template>
  <div>
    <HeaderBar />
    <div class="register">
      <h2>患者注册</h2>
      <el-form :model="registerValidateForm" ref="registerValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="姓名"
          prop="name"
          :rules="[
            { required: true, message: '姓名不能为空'},
          ]"
        >
          <el-input v-model="registerValidateForm.name" placeholder="请设置姓名" maxlength="10" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          prop="sex"
        >
          <el-radio-group v-model="registerValidateForm.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[
            { required: true, message: '密码不能为空'},
          ]"
        >
          <el-input type="password" v-model="registerValidateForm.password" @input="pwdStrength" maxlength="8" placeholder="请设置8位数字、字母密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码强度"
        >
          <el-progress :style="{marginTop: '10px'}" :percentage="percentage" :color="customColorMethod"  :format="format" :stroke-width="15"></el-progress>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerValidateForm')">注册</el-button>
          <el-button @click="resetForm('registerValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- <div class="tologin">已注册？<el-link type="primary" @click="ToLogin">去登录</el-link></div> -->
    </div>
  </div>
</template>

<script>
import HeaderBar from '../../components/HeaderBar.vue';
export default {
  name: 'register',
  components: {
    HeaderBar,
  },
  data() {
    return {
      percentage: 0,
      registerValidateForm: {
        name: '',
        sex: '男',
        password: '',
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.patientRegister();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    ToLogin() {
      this.$router.replace({
        name: 'Login',
        params: {
          userType: '患者',
        }
      })
    },
    pwdStrength(val) {
      let strength = 0;
      if(val.length == 8) {
        strength += 1;
      }
      if(/\d/.test(val)) {
        strength += 1;
      }
      if(/\D/.test(val)) {
        strength += 1;
      }
      if(strength == 3) {
        this.percentage = 100;
      } 
      if(strength == 2) {
        this.percentage = 65;
      } 
      if(strength == 1) {
        this.percentage = 35;
      }
      if(strength == 0) {
        this.percentage = 0;
      }
    },
    customColorMethod(percentage) {
      if (percentage < 40) {
        return '#909399';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else {
        return '#67c23a';
      }
    },
    format(percentage) {
      if (percentage < 40) {
        return '弱';
      } else if (percentage < 70) {
        return '中';
      } else {
        return '强';
      }
    },
    patientRegister() {
      console.log('register');
      let data = {
        id: sessionStorage.getItem('card_id') || '1234',
        name: this.registerValidateForm.name,
        sex: this.registerValidateForm.sex,
        pwd: this.registerValidateForm.password,
      }
      this.$axios.post('/user/p_info', data)
      .then((res) => {
        console.log(res);
        if(res.code == 200) {
          this.$message.success('注册成功！请前往登录！');
          this.ToLogin();
        } else {
          this.$message.error(res?.message);
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  width: 350px;
  margin: 0 auto;
  h2 {
    padding: 20px 0;
    text-align: center;
  }
  .tologin{
    text-align: center;
  }
}
</style> 