<template>
  <div>
    <HeaderBar />
    <div class="registration">
      <h2>挂号界面</h2>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="选择科室">
          <el-select v-model="form.adminOffice" placeholder="请选择科室">
            <el-option v-for="item in adminOffice" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择医生职位">
          <el-select v-model="form.technicalPost" placeholder="请选择医生职位">
            <el-option v-for="item in technicalPost" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择医生">
          <el-radio-group v-model="form.doctor">
            <el-radio style="margin: 5px" v-for="item in doctor" :key="item.id" :label="item.name"> {{item.name + ' (余号数：' + item.restNum + ')'}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button style="marginLeft: 18px" type="primary">挂号缴费</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import HeaderBar from '../../components/HeaderBar.vue';
export default {
  name: 'registration',
  components: {
    HeaderBar,
  },
  data() {
    return {
      form: {
        adminOffice: '',
        technicalPost: '',
        doctor: '',
      },
      adminOffice: [
        {
          id: '1',
          name: '外科',
        },
        {
          id: '2',
          name: '内科',
        },
        {
          id: '3',
          name: '口腔科',
        },
        {
          id: '4',
          name: '骨科',
        },
      ],
      technicalPost: [
        {
          id: '1',
          name: '主任医生',
        },
        {
          id: '2',
          name: '副主任医生',
        },
        {
          id: '3',
          name: '主治医生',
        }
      ],
      doctor: [
        {
          id: '1',
          name: '吴思',
          restNum: 20,
        },
        {
          id: '2',
          name: '张丽',
          restNum: 20,
        },
        {
          id: '3',
          name: '金鑫',
          restNum: 20,
        }
      ]
    }
  },
  methods: {
    RegistrationRequst() {
      let data = {
        registered_id: sessionStorage.getItem('card_id'),
        registered_department_name: this.form.adminOffice,
        registered_doctor_postion: this.form.technicalPost,
        registered_doctor_name: this.form.doctor,
      }
      this.$axios.post('/user/reg_in', data)
      .then((res) => {
        if(res.code == 200) {
          sessionStorage.setItem('registeredId', res.data);
          this.$message.success('挂号成功！');
          this.$router.go(-1);
        } else {
          this.$message.error(res?.message);
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.registration {
  width: 400px;
  margin: 0 auto;
  h2 {
    text-align: center;
    padding-top: 20px;
    padding-bottom: 15px;
  }
}
</style>