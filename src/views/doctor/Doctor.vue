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
        <li><el-button type="info" @click="$router.push('/diagnoseLog')">患者诊断记录</el-button></li>
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
        <el-button type="success" >下一号</el-button>
        <p>当前待就诊人数：{{waitTreatNum}}</p>
      </div>
    </div>
    <el-drawer
      title="药品选择界面"
      :visible.sync="SelectDrugsVisible"
      size="50%"
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
        adminOffice: '口腔科',
        technicalPost: '主治医生',
        name: '张医生',
      },
      patientInfo: {
        name: '王五',
        age: '30',
        sex: '男',
      },
      diagnose: '',
      prescription: '',
      waitTreatNum: 20,
    }
  },
  methods: {
    getSelectDrugsInfo(data) {
      console.log(data);
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