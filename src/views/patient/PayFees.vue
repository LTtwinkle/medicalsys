<template>
  <div>
    <HeaderBar />
    <div class="payfees">
      <h2>缴费界面</h2>
      <p>卡内余额：{{balance}}</p>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="prescription"
          label="处方单">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="80">
        </el-table-column>
        <el-table-column
          prop="action"
          label="操作"
          width="80">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleDelete(scope.$index, scope.row)">缴费</el-button>
          </template>
        </el-table-column>
      </el-table>
      <p>余额不足？<el-link type="primary" @click="$router.push('/recharge')">去充值</el-link></p>
    </div>
  </div>
</template>
<script>
import HeaderBar from '../../components/HeaderBar.vue';
export default {
  name: 'payfees',
  components: {
    HeaderBar,
  },
  data() {
    return {
      balance: 100,
      tableData: [{
        date: '2016-05-02',
        prescription: '王小虎',
        status: '已缴费',
        action: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        prescription: '王小虎',
        status: '未缴费',
        action: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },

}
</script>
<style lang="less" scoped>
.payfees {
  width: 800px;
  margin: 0 auto;
  h2 {
    text-align: center;
    padding-top: 20px;
    padding-bottom: 15px;
  }
}
</style>