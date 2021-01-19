<template>
  <div>
    <HeaderBar />
    <div class="diagnoseLog">
      <h2>缴费界面</h2>
      <p>卡内余额：{{balance}}</p>
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
      balance: '90',
      tableData: [{
        science: '口腔科',
        doctor: '王小虎',
        disease: '口腔溃疡',
        prescription: '消炎药',
        fees: '9.8',
        ifPayed: '已缴费'
      }]
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