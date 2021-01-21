<template>
  <div>
    <HeaderBar />
    <div class="diagnoseLog">
      <h2>诊断记录界面</h2>
      <p v-show="balance">卡内余额：{{balance}}</p>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="science"
          label="诊疗科室"
          width="100">
        </el-table-column>
        <el-table-column
          prop="doctor"
          label="诊疗医师"
          width="100">
        </el-table-column>
        <el-table-column
          prop="disease"
          label="疾病情况">
        </el-table-column>
        <el-table-column
          prop="prescription"
          label="处方单">
        </el-table-column>
        <el-table-column
          prop="fees"
          label="处方费用（元）"
          width="120">
        </el-table-column>
        <el-table-column
          prop="ifPayed"
          label="缴费情况"
          width="100">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import HeaderBar from '../../components/HeaderBar.vue';
export default {
  name: 'diagnoseLog',
  components: {
    HeaderBar,
  },
  data() {
    return {
      balance: '',
      tableData: [],
      card_id: '',
    }
  },
  mounted() {
    this.card_id = this.$route.query.card_id || '';
    this.balance = this.$route.query.balance || '';
    this.getPatientDiagnosis();
  },
  methods: {
    getPatientDiagnosis() {
      this.$axios.post('/user/Get_patient_diagnosis',{
        account: this.card_id,
      })
      .then((res) => {
        if(res.code == 100) {
          if(res.data instanceof Array) {
            this.tableData = res.data.map((item) => {
              return {
                science: item.diagnosis_department,
                doctor: item.diagnosis_doctor,
                disease: item.diagnosis_disease,
                prescription: item.diagnosis_prescription,
                fees: item.diagnosis_prescription_money,
                ifPayed: item.diagnosis_pay_is_or_not === true? '已缴费': '未缴费',
              }
            })
          }
        } else {
          this.$message.error(res?.message);
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.diagnoseLog {
  width: 920px;
  margin: 0 auto;
  h2 {
    text-align: center;
    padding-top: 20px;
    padding-bottom: 15px;
  }
}
</style>