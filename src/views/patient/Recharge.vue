<template>
  <div>
    <HeaderBar />
    <div class="recharge">
      <h2>充值界面</h2>
      <el-form :model="rechargeForm" label-width="120px">
        <el-form-item label="您的卡内余额">
          <span>{{balance}}</span>
        </el-form-item>
        <el-form-item label="输入充值金额">
          <el-input type="number" v-model="rechargeForm.rechargeValue" min="1"></el-input>
        </el-form-item>
        <el-form-item label="选择充值方式">
          <el-radio-group v-model="rechargeForm.rechargeWays">
            <el-radio style="margin: 5px" v-for="item in rechargeWays" :key="item.id" :label="item.id">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-image
            style="width: 150px; height: 150px"
            :src="url"
            fit="cover"></el-image>
          <br/>
          <span>请扫描二维码进行支付！</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import HeaderBar from '../../components/HeaderBar.vue';
export default {
  name: 'recharge',
  components: {
    HeaderBar,
  },
  data() {
    return {
      balance: '20',
      url: require("../../assets/u119.png"),
      rechargeForm: {
        rechargeValue: '',
        rechargeWays: '1',
      },
      rechargeWays: [
        {
          id: '1',
          name: '微信支付',
        },
        {
          id: '2',
          name: '支付宝支付',
        },
        {
          id: '3',
          name: '银行卡支付',
        }
      ]
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.recharge {
  width: 450px;
  margin: 0 auto;
  h2 {
    text-align: center;
  }
}
</style>