<template>
  <div>
    <HeaderBar />
    <div class="doctor">
      <h2>医生主界面</h2>
      <div class="info">
        <el-image class="portrait"
          :src="url"
          fit="cover">
        </el-image>
        <ul>
          <li>科室名：{{doctorInfo.adminOffice}}</li>
          <li>医生职位：{{doctorInfo.technicalPost}}</li>
          <li>医生姓名：{{doctorInfo.name}}</li>
        </ul>
      </div>
      <ul class="patientInfo">
        <li style="color: red;">正在就诊：</li>
        <li>姓名：{{patientInfo.name}}</li>
        <li>年龄：{{patientInfo.age}}</li>
        <li>性别：{{patientInfo.sex}}</li>
        <li><el-button type="info" @click="ToDiagnoseLog">患者诊断记录</el-button></li>
      </ul>
      <ul class="diagnoseInfo">
        <li>
          <label>诊断信息：</label>
           <el-input
            type="textarea"
            v-model="diagnose"
            placeholder="请诊断医生输入诊断信息"
            maxlength="50"
            :autosize="{ minRows: 3, maxRows: 5}"
            show-word-limit
          >
          </el-input>
        </li>
        <li>
          <label>处方单：</label>
           <el-input
            type="textarea"
            v-model="prescription"
            placeholder="请诊断医生输入处方单详情"
            maxlength="50"
            :autosize="{ minRows: 3, maxRows: 5}"
            show-word-limit
          >
          </el-input>
        </li>
        <li>
          <div>
            <el-button type="warning" @click="SelectDrugsVisible = true" >选择药品</el-button>
          </div>
        </li>
      </ul>
      <div class="next">
        <el-button type="success" @click="Calling" >下一号</el-button>
        <!-- <p>当前待就诊人数：{{waitTreatNum}}</p> -->
      </div>
    </div>
    <el-drawer
      title="药品选择界面"
      :visible.sync="SelectDrugsVisible"
      size="50%"
      ref="drawerSelect"
    >
      <SelectDrugs @save-info="getSelectDrugsInfo" />
    </el-drawer>
  </div>
</template>
<script>
import HeaderBar from '../../components/HeaderBar.vue';
import SelectDrugs from './SelectDrugs.vue';
export default {
  name: 'doctor',
  components: {
    HeaderBar,
    SelectDrugs,
  },
  data() {
    return {
      url: require("../../assets/u237.png"),
      SelectDrugsVisible: false,
      doctorInfo: {
        id: '',
        adminOffice: '',
        technicalPost: '',
        name: '',
      },
      patientInfo: {
        card_id: '',
        name: '',
        age: '',
        sex: '',
      },
      diagnose: '',
      prescription: '',
      totalMoney: 0,
      waitTreatNum: 20,
    }
  },
  mounted() {
    this.doctorInfo.id = sessionStorage.getItem('doctor_id');
    this.getDoctorInfo();
  },
  methods: {
    getSelectDrugsInfo(data) {
      console.log(data);
      data.map((item) => {
        this.prescription += item.name + '(' + item.quantity + ') ';
        this.totalMoney += parseFloat(item.price) * item.quantity;
      })
      this.SelectDrugsVisible = false;
    },
    Calling() {
      if(this.patientInfo.card_id == '') {
        this.getPatientInfo();
        return;
      }
      let data = {
        card_id: this.patientInfo.card_id,
        total_money: this.totalMoney,
        diagnosis_disease: this.diagnose,
        diagnosis_prescription: this.prescription,
        department_name: this.doctorInfo.adminOffice,
        doctor_id: this.doctorInfo.id,
        doctor_position: this.doctorInfo.technicalPost,
        doctor_name: this.doctorInfo.name,
      }
      console.log(data);
      this.$axios.post('/user/Calling', data)
      .then((res) => {
        // console.log(res);
        if(res.code == 200) {
          this.patientInfo.card_id = res.data.parent_id;
          this.patientInfo.name = res.data.parent_name;
          this.patientInfo.sex = res.data.parent_sex;
          this.patientInfo.age = res.data.parent_age;
        } else {
          this.$message.error(res.message);
          this.patientInfo.card_id = '';
          this.patientInfo.name = '';
          this.patientInfo.sex = '';
          this.patientInfo.age = '';
        }
        this.diagnose = '';
        this.prescription = '';
        this.totalMoney = 0;
      })
    },
    getDoctorInfo() {
      this.$axios.post('/user/Doctor_Information', {
        account: this.doctorInfo.id,
      })
      .then((res) => {
        // console.log(res)
        if(res.code == 200) {
          this.doctorInfo.adminOffice = res.data.doctor_department;
          this.doctorInfo.technicalPost = res.data.doctor_position;
          this.doctorInfo.name = res.data.doctor_name;
        } else {
          this.$message.error(res?.message);
        }
      })
      .then(() => {
        this.getPatientInfo();
      })
    },
    getPatientInfo() {
      this.$axios.post('/user/Get_next_registor', {
        department_name: this.doctorInfo.adminOffice,
        doctor_position: this.doctorInfo.technicalPost,
        doctor_name: this.doctorInfo.name,
      })
      .then((res) => {
        if(res.code == 200) {
          this.patientInfo.card_id = res.data.parent_id;
          this.patientInfo.name = res.data.parent_name;
          this.patientInfo.sex = res.data.parent_sex;
          this.patientInfo.age = res.data.parent_age;
          this.diagnose = '';
          this.prescription = '';
        } else {
          this.$message.error(res?.message);
        }
      })
    },
    ToDiagnoseLog() {
      this.$router.push({
        path: '/diagnoseLog',
        query: {
          card_id: this.patientInfo.card_id,
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
ul,li {
  list-style: none;
  padding: 0;
  margin: 0;
}
.doctor {
  width: 800px;
  margin: 0 auto;
  h2 {
    text-align: center;
  }
  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    .portrait {
      width: 100px;
      min-width: 100px;
      height: 100px;
      border-radius: 10px;
      margin: 15px 0;
    }
    ul {
      display: flex;
      flex-direction: column;
      margin-left: 30px;
      li {
        min-width: 200px;
        margin: 6px 0;
      }
    }
  }
  .patientInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
  }
  .diagnoseInfo {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    li {
      display: flex;
      label {
        width: 120px;
      }
    }
  }
  .next {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

/deep/ :focus {
  outline: 0;
}
</style>