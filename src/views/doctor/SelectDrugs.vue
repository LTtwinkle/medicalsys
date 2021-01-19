<template>
  <div class="registration">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="药品类别">
        <el-select v-model="form.DrugCategory" placeholder="请选择科室">
          <el-option v-for="item in DrugCategory" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="大概症状">
        <el-select v-model="form.SpecificSymptoms" placeholder="请选择医生职位">
          <el-option v-for="item in SpecificSymptoms" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择药品及数量">
        <el-checkbox-group v-model="form.DrugsAndNum">
          <el-checkbox style="margin: 5px" v-for="item in DrugsAndNum" :key="item.id" :label="item.name">
            <span style="margin: 0 10px;">{{item.name}}</span>
            <el-input v-model="item.quantity" style="width: 100px;" type="number" min="1" size="small"></el-input>
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button style="marginLeft: 18px" type="primary" @click="saveInfo">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'registration',
  data() {
    return {
      form: {
        DrugCategory: '',
        SpecificSymptoms: '',
        DrugsAndNum: [],
      },
      DrugCategory: [
        {
          id: '1',
          name: '呼吸系统用药',
        },
        {
          id: '2',
          name: '神经系统用药',
        },
        {
          id: '3',
          name: '心脑血管用药',
        },
        {
          id: '4',
          name: '内分泌用药',
        },
        {
          id: '5',
          name: '泌尿系统用药',
        },
      ],
      SpecificSymptoms: [
        {
          id: '1',
          name: '咳嗽发热',
        },
        {
          id: '2',
          name: '头痛头昏',
        },
        {
          id: '3',
          name: '四肢乏力',
        }
      ],
      DrugsAndNum: [
        { 
          id: '1',
          name: '贝克思止痛药',
          price: 19.8,
          quantity: 20,
        },
        {
          id: '2',
          name: '999感冒灵',
          price: 9.8,
          quantity: 20,
        },
        {
          id: '3',
          name: '贝洛分颗粒',
          price: 15.8,
          quantity: 20,
        }
      ]
    }
  },
  methods: {
    saveInfo() {
      this.$emit('save-info', this.form)
    }
  }
}
</script>
<style lang="less" scoped>
.registration {
  width: 400px;
  margin: 0 auto;
}
/deep/ .el-input__inner {
  padding-right: 0;
}
</style>