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
          width="180">
        </el-table-column>
        <el-table-column
          prop="prescription"
          label="处方单">
        </el-table-column>
        <el-table-column
          prop="fees"
          label="费用(元）"
          width="100">
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
              @click="handlePay(scope.$index, scope.row)">缴费</el-button>
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
      balance: 0,
      card_id: '',
      tableData: []
    }
  },
  mounted() {
    this.balance = this.$route.query.balance;
    this.card_id = sessionStorage.getItem('card_id');
    this.getPayList();
  },
  methods: {
    handlePay(index,row) {
      console.log(index,row);
      this.$axios.post('/user/patientPay', {
        parent_id: this.card_id,
        diagnosis_time: row.date,
      })
      .then((res) => {
        if(res.code == 200) {
          this.$message.success('缴费成功！');
          this.getPayList();
        } else {
          this.$message.error(res?.message);
        }
      })
    },
    getPayList() {
      this.$axios.post('/user/payInfo', {
        parent_id: this.card_id,
      })
      .then((res) => {
        console.log(res);
        if(res.code == 200) {
          console.log(res.data);
          if(res.data instanceof Array) {
            this.tableData = res.data.map((item) => {
              return {
                date: item.diagnosis_time,
                prescription: item.diagnosis_prescription,
                fees: item.diagnosis_prescription_money,
                status: item.disgnosis_pay_is_or_not? '已缴费': '未缴费',
              }
            })
          } else {
            this.tableData = [{
              date: res.data.diagnosis_time,
              prescription: res.data.diagnosis_prescription,
              fees: res.data.diagnosis_prescription_money,
              status: res.data.disgnosis_pay_is_or_not? '已缴费': '未缴费',
            }]
          }
        } else {
          this.$message.error(res?.message);
        }
      })
    },
  }
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